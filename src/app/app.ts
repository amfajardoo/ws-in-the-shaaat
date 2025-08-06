import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Authentication } from '@auth/authentication';
import { LoadingSession } from '@components/loading-session/loading-session';

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
