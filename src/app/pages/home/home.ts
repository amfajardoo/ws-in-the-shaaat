import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Authentication } from '@auth/authentication';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [ReactiveFormsModule],
})
export default class Home {
  #auth = inject(Authentication);

  logout() {
    this.#auth.logout();
  }

  onSubmit() {}

  get user() {
    return this.#auth.user();
  }
}
