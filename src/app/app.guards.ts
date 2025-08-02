import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { first, map, tap } from 'rxjs/operators';
import { Firebase } from './services/firebase';

export const authGuard: CanActivateFn = () => {
  const firebase = inject(Firebase);
  const router = inject(Router);

  return firebase.authState$.pipe(
    first(),
    map((user) => !!user),
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
      }
    })
  );
};

export const publicGuard: CanActivateFn = () => {
  const firebase = inject(Firebase);
  const router = inject(Router);

  return firebase.authState$.pipe(
    first(),
    map((user) => !user),
    tap((isLoggedOut) => {
      if (!isLoggedOut) {
        router.navigate(['/home']);
      }
    })
  );
};
