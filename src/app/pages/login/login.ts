import { Component, inject } from '@angular/core';
import { Authentication } from './auth/authentication';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
  host: {
    class: 'bg-gray-100 flex items-center justify-center min-h-screen',
  },
})
export default class Login {
  #auth = inject(Authentication);

  loginWithGoogle() {
    this.#auth.loginWithGoogle();
  }
}
