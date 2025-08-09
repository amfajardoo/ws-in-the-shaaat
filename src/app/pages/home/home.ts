import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Chat } from '@components/chat/chat';
import { User } from '@interfaces/users';
import { Authentication } from '@pages/login/auth/authentication';
import { ChatsRepository } from '@repositories/chats.repository';
import { ContactsRepository } from '@repositories/contacts.repository';

interface ContactForm {
  contactEmail: FormControl<string>;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [ReactiveFormsModule, NgOptimizedImage, Chat],
})
export default class Home {
  #auth = inject(Authentication);
  #fb = inject(NonNullableFormBuilder);
  #usersContactsDataClient = inject(ContactsRepository);
  #chatManager = inject(ChatsRepository);

  form: FormGroup<ContactForm> = this.createContactForm();
  contactsListResource = this.#usersContactsDataClient.contactsListResource;
  currentContact = signal<User | null>(null);
  chatIdWithCurrentContact = signal<string | null>(null);

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
    const userId = this.#auth.user()?.id;
    if (this.form.valid && userId) {
      const contactEmail = this.form.getRawValue().contactEmail;

      this.#usersContactsDataClient.createContact(userId, contactEmail);
    }
  }

  async startChat(contact: User) {
    const userId = this.#auth.user()?.id;
    if (!userId) {
      return;
    }

    const chatExists = await this.#chatManager.verifyChatExists(
      this.#auth.user()?.id || '',
      contact.id,
    );
    if (!chatExists) {
      const participants = [userId, contact.id];
      const chatId = await this.#chatManager.createChat(participants);
      this.chatIdWithCurrentContact.set(chatId);
    } else {
      this.chatIdWithCurrentContact.set(chatExists);
    }
    this.currentContact.set(contact);
  }
}
