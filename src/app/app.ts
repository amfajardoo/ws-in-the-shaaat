import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSession } from '@components/loading-session/loading-session';
import { Authentication } from '@pages/login/auth/authentication';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingSession],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  #auth = inject(Authentication);
  authReady = this.#auth.isAuthReady;
}
