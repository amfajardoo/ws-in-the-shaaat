import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { collections } from '.';

@Injectable({
  providedIn: 'root',
})
export class UsersDataClient {
  firestore = inject(Firestore);

  async verifyUserExists(userId: string): Promise<boolean> {
    const userDocRef = doc(this.firestore, collections.users, userId);
    const userDocSnapshot = await getDoc(userDocRef);
    return userDocSnapshot.exists();
  }

  async createUserDocument(user: User) {
    const { email } = user;
    const userDocRef = doc(this.firestore, collections.users, user.uid);
    await setDoc(userDocRef, {
      email,
      displayName: user.displayName || '',
      photoUrl: user.photoURL || '',
      createdAt: new Date().toISOString(),
    });
  }
}
