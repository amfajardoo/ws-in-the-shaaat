import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Users } from '.';
import { collections } from '..';

@Injectable({
  providedIn: 'root',
})
export class UsersDataClient {
  #firestore = inject(Firestore);

  async verifyUserExists(userId: string): Promise<boolean> {
    const userDocRef = doc(this.#firestore, collections.users, userId);
    const userDocSnapshot = await getDoc(userDocRef);
    return userDocSnapshot.exists();
  }

  async createUserDocument(user: User) {
    const { email } = user;
    const userDocRef = doc(this.#firestore, collections.users, user.uid);
    await setDoc(userDocRef, {
      email,
      displayName: user.displayName || '',
      photoUrl: user.photoURL || '',
      createdAt: new Date().toISOString(),
    });
  }

  async getUserProfile(userId: string): Promise<Users | null> {
    const userDocRef = doc(this.#firestore, collections.users, userId);
    const userDocSnapshot = await getDoc(userDocRef);
    return userDocSnapshot.exists()
      ? ({ uid: userId, ...userDocSnapshot.data() } as Users)
      : null;
  }

  async getUserProfileByEmail(email: string): Promise<Users | null> {
    const usersRef = collection(this.#firestore, collections.users);
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }
    const userDoc = snapshot.docs[0];
    return { uid: userDoc.id, ...userDoc.data() } as Users;
  }
}
