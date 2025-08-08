import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Authentication } from '@auth/authentication';
import { ChatManager } from '@collections/chat-manager/chat-manager';
import { UserContactsDataClient } from '@collections/helpers/user-contacts-data-client';
import { UserDocument } from '@collections/users';
import { Chat } from '@components/chat/chat';

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
  #usersContactsDataClient = inject(UserContactsDataClient);
  #chatManager = inject(ChatManager);

  form: FormGroup<ContactForm> = this.createContactForm();
  contactsListResource = this.#usersContactsDataClient.contactsListResource;
  currentContact = signal<UserDocument | null>(null);
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
    const userId = this.#auth.user()?.uid;
    if (this.form.valid && userId) {
      const contactEmail = this.form.getRawValue().contactEmail;

      this.#usersContactsDataClient.createContact(userId, contactEmail);
    }
  }

  async startChat(contact: UserDocument) {
    const userId = this.#auth.user()?.uid;
    if (!userId) {
      return;
    }

    const chatExists = await this.#chatManager.verifyChatExists(
      this.#auth.user()?.uid || '',
      contact.uid,
    );
    if (!chatExists) {
      const participants = [userId, contact.uid];
      const chatId = await this.#chatManager.createChat(participants);
      this.chatIdWithCurrentContact.set(chatId);
    } else {
      this.chatIdWithCurrentContact.set(chatExists);
    }
    this.currentContact.set(contact);
  }
}
