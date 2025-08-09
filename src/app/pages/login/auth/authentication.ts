import { computed, effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  authState,
  User as FireUser,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '@interfaces/users';
import { UsersRepository } from '@repositories/users.repository';
import {
  debounceTime,
  from,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { FirebaseDataClient } from 'src/app/firebase-data.client';

const ONE_SECOND = 1000;

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  #firebase = inject(FirebaseDataClient);
  #auth: Auth = inject(Auth);
  #usersDataClient = inject(UsersRepository);
  #router = inject(Router);
  authState$: Observable<User | null> = authState(this.#auth).pipe(
    switchMap((user: FireUser | null) => {
      if (!user) {
        return of(null);
      }

      const userDoc = this.#firebase.getById<User>('users', user.uid);
      return from(userDoc);
    }),
  );
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

    this.#usersDataClient.createUserDocument(userCredentials.user);
  }

  logout(): void {
    this.#auth.signOut();
  }
}
