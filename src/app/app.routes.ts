import { Routes } from '@angular/router';
import { authGuard, publicGuard, waitForAuthReady } from './app.guards';

export const routes: Routes = [
  {
    path: '',
    canMatch: [waitForAuthReady],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'login',
        canActivate: [publicGuard],
        loadComponent: () => import('./pages/login/login'),
      },
      {
        path: 'home',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/home/home'),
      },
    ],
  },
];
