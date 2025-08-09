import { Injectable, inject } from '@angular/core';
import { User as FireUser } from '@angular/fire/auth';
import { serverTimestamp, where } from '@angular/fire/firestore';
import { User } from '@interfaces/users';
import { FirebaseDataClient } from '../firebase-data.client';

@Injectable({
  providedIn: 'root',
})
export class UsersRepository {
  #firebase = inject(FirebaseDataClient);

  async createUserDocument(user: FireUser): Promise<void> {
    const { uid, email } = user;
    const userDocSnapshot = await this.#firebase.getById<User>('users', uid);

    if (userDocSnapshot) {
      // Manejar el caso de que el usuario ya existe, quizás actualizarlo.
      // throw new Error('User already exists');
      return;
    }

    const userData = {
      email,
      displayName: user.displayName || '',
      photoUrl: user.photoURL || '',
      createdAt: serverTimestamp(),
    };
    await this.#firebase.set('users', uid, userData);
  }

  async getUserProfile(userId: string): Promise<User | null> {
    return this.#firebase.getById<User>('users', userId);
  }

  async getUserProfileByEmail(email: string): Promise<User | null> {
    const q = this.#firebase.createQuery<User>(
      'users',
      where('email', '==', email),
    );
    const users = await this.#firebase.getMany<User>(q);
    return users.length > 0 ? users[0] : null;
  }
}
