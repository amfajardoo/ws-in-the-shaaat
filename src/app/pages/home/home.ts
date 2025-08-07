import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Authentication } from '@auth/authentication';
import { UserContactsDataClient } from '@collections/helpers/user-contacts-data-client';

interface ContactForm {
  contactEmail: FormControl<string>;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [ReactiveFormsModule, NgOptimizedImage],
})
export default class Home {
  #auth = inject(Authentication);
  #fb = inject(NonNullableFormBuilder);
  #usersContactsDataClient = inject(UserContactsDataClient);
  form: FormGroup<ContactForm> = this.createContactForm();
  contactsListResource = this.#usersContactsDataClient.contactsListResource;

  logout() {
    this.#auth.logout();
  }

  createContactForm(): FormGroup<ContactForm> {
    return this.#fb.group({
      contactEmail: this.#fb.control('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  onSubmit() {
    const userId = this.#auth.user()?.uid;
    if (this.form.valid && userId) {
      const contactEmail = this.form.getRawValue().contactEmail;

      this.#usersContactsDataClient.createContact(userId, contactEmail);
    }
  }
}
