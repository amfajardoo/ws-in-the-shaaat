import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { Authentication } from '@auth/authentication';
import { filter, first, map } from 'rxjs/operators';

export const waitForAuthReady: CanMatchFn = () => {
  const auth = inject(Authentication);
  return auth.isAuthReady$.pipe(
    filter((ready) => ready),
    first(),
    map(() => true),
  );
};

export const authGuard: CanActivateFn = () => {
  const auth = inject(Authentication);
  return auth.isLoggedIn();
};

export const publicGuard: CanActivateFn = () => {
  const authentication = inject(Authentication);
  const isLoggedOut = !authentication.isLoggedIn();

  return isLoggedOut;
};
