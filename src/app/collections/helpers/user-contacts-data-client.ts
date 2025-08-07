import { inject, Injectable, resource } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  or,
  query,
  where,
} from '@angular/fire/firestore';
import { Authentication } from '@auth/authentication';
import { Users } from '@collections/users';
import { collections } from '..';
import { ContactsDataClient } from '../contacts/contacts-data-client';
import { UsersDataClient } from '../users/users-data-client';

@Injectable({
  providedIn: 'root',
})
export class UserContactsDataClient {
  #firestore = inject(Firestore);
  #auth = inject(Authentication);
  #usersDataClient = inject(UsersDataClient);
  #contactsDataClient = inject(ContactsDataClient);
  contactsListResource = resource<Users[], User | null>({
    params: this.#auth.user,
    loader: ({ params }) => {
      if (!params) {
        return Promise.resolve([]);
      }
      return this.#getUserContactProfiles(params.uid);
    },
    defaultValue: [],
  });

  async createContact(userId: string, contactEmail: string): Promise<void> {
    const contactUser =
      await this.#usersDataClient.getUserProfileByEmail(contactEmail);
    if (!contactUser) {
      throw new Error('Contact user does not exist');
    }
    this.#contactsDataClient.createContactDocument({
      userId,
      contactId: contactUser.uid,
    });
  }

  async #getUserContactProfiles(userId: string): Promise<Users[]> {
    const contactsRef = collection(this.#firestore, collections.contacts);
    const q = query(
      contactsRef,
      or(where('userId', '==', userId), where('contactId', '==', userId)),
    );
    const snapshot = await getDocs(q);

    const contactIds = snapshot.docs.map((doc) => doc.data()['contactId']);

    const profiles = await Promise.all(
      contactIds.map(async (id) => {
        const userDoc = await getDoc(
          doc(this.#firestore, collections.users, id),
        );
        return userDoc.exists()
          ? ({ uid: id, ...userDoc.data() } as Users)
          : null;
      }),
    );

    return profiles.filter(Boolean) as Users[];
  }
}
