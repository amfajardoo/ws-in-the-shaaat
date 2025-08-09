import { Injectable, inject, resource } from '@angular/core';
import { or, where } from '@angular/fire/firestore';
import { Contact } from '@interfaces/contact';
import { User } from '@interfaces/users';
import { Authentication } from '@pages/login/auth/authentication';
import { FirebaseDataClient } from '../firebase-data.client';
import { UsersRepository } from './users.repository';

@Injectable({
  providedIn: 'root',
})
export class ContactsRepository {
  #firebase = inject(FirebaseDataClient);
  #auth = inject(Authentication);
  #usersRepo = inject(UsersRepository);

  contactsListResource = resource<User[], User | null>({
    params: this.#auth.user,
    loader: ({ params }) => {
      if (!params) {
        return Promise.resolve([] as User[]);
      }
      return this.getUserContactProfiles(params.id);
    },
    defaultValue: [],
  });

  async createContact(userId: string, contactEmail: string): Promise<void> {
    const contactUser =
      await this.#usersRepo.getUserProfileByEmail(contactEmail);
    if (!contactUser) {
      throw new Error('Contact user does not exist');
    }

    const contactDocUid = `${userId}-${contactUser.id}`;
    const docExists = await this.#firebase.exists<Contact>(
      'contacts',
      contactDocUid,
    );

    if (docExists) {
      throw new Error('Contact already added');
    }

    const contactData = {
      userId,
      contactId: contactUser.id,
    };
    await this.#firebase.set<Contact>('contacts', contactDocUid, contactData);
  }

  async getUserContactProfiles(userId: string): Promise<User[]> {
    const q = this.#firebase.createQuery<Contact>(
      'contacts',
      or(where('userId', '==', userId), where('contactId', '==', userId)),
    );
    const contacts = await this.#firebase.getMany<Contact>(q);
    const contactIds = contacts.map((c) => c.contactId);

    const profiles = await Promise.all(
      contactIds.map((id) => this.#usersRepo.getUserProfile(id)),
    );

    return profiles.filter((profile): profile is User => profile !== null);
  }
}
