import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ws-in-the-shaaat',
        appId: '1:876750835419:web:c35c86c7d99b23e86dc6fe',
        storageBucket: 'ws-in-the-shaaat.firebasestorage.app',
        apiKey: 'AIzaSyDu_-7Rw78ZuyFe_P29E-p5QnaMITkLj1c',
        authDomain: 'ws-in-the-shaaat.firebaseapp.com',
        messagingSenderId: '876750835419',
        measurementId: 'G-LH7RWYDSQ1',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
