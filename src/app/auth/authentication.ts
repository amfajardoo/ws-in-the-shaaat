import { computed, effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UsersDataClient } from '@collections/users/users-data-client';
import { debounceTime, map, shareReplay, startWith } from 'rxjs';

const ONE_SECOND = 1000;

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  #auth: Auth = inject(Auth);
  #usersDataClient = inject(UsersDataClient);
  #router = inject(Router);
  authState$ = authState(this.#auth);
  isAuthReady$ = this.authState$.pipe(
    debounceTime(ONE_SECOND),
    map(() => true),
    startWith(false),
    shareReplay(1),
  );
  readonly user = toSignal(this.authState$, { initialValue: null });
  readonly isLoggedIn = computed(() => !!this.user());
  readonly isAuthReady = toSignal(this.isAuthReady$, { initialValue: false });

  constructor() {
    effect(() => {
      this.isLoggedIn()
        ? this.#router.navigate(['/home'])
        : this.#router.navigate(['/login']);
    });
  }

  async loginWithGoogle(): Promise<void> {
    const userCredentials: UserCredential = await signInWithPopup(
      this.#auth,
      new GoogleAuthProvider(),
    );
    const user = userCredentials.user;
    const userId = user.uid;
    const userExists = await this.#usersDataClient.verifyUserExists(userId);
    if (!userExists) {
      this.#usersDataClient.createUserDocument(user);
    }
  }

  logout(): void {
    this.#auth.signOut();
  }
}
