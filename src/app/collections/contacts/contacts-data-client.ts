import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { collections } from '..';
import { ContactDocument } from '../../interfaces/contacts';

@Injectable({
  providedIn: 'root',
})
export class ContactsDataClient {
  #firestore = inject(Firestore);

  async verifyContactDocumentExists(
    userId: string,
    contactId: string,
  ): Promise<boolean> {
    const contactDocUid = `${userId}-${contactId}`;
    const contactDocRef = doc(
      this.#firestore,
      collections.contacts,
      contactDocUid,
    );
    const contactDocSnapshot = await getDoc(contactDocRef);
    return contactDocSnapshot.exists();
  }

  async createContactDocument(contact: ContactDocument): Promise<void> {
    const exists = await this.verifyContactDocumentExists(
      contact.userId,
      contact.contactId,
    );
    if (exists) {
      alert('Contact already added');
    }
    const contactDocUid = `${contact.userId}-${contact.contactId}`;
    const contactsDocRef = doc(
      this.#firestore,
      collections.contacts,
      contactDocUid,
    );
    await setDoc(contactsDocRef, contact);
  }
}
