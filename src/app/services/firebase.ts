import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Firebase {
  router = inject(Router);
  auth: Auth = inject(Auth);
  readonly authState$: Observable<User | null> = authState(this.auth);
  user = toSignal(this.authState$, { initialValue: null });

  loginWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout(): void {
    this.auth.signOut();
  }
}
