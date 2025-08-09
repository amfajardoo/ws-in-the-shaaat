import { NgOptimizedImage } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authentication } from '@auth/authentication';
import { User } from '@interfaces/users';
import { ChatsRepository } from '@repositories/chats.repository';
import { FromServerTimestampToLocalStringPipe } from './from-server-timestamp-to-local-string-pipe';

@Component({
  selector: 'app-chat',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    FromServerTimestampToLocalStringPipe,
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  #fb = inject(FormBuilder);
  #chatManager = inject(ChatsRepository);
  #auth = inject(Authentication);
  contact = input.required<User>();
  chatId = input.required<string | null>();
  messageForm = this.#fb.group({
    message: this.#fb.control('', [Validators.required]),
  });
  contactId = computed(() => this.contact()?.id);
  messagesResource = this.#chatManager.messagesResource;

  constructor() {
    effect(() => {
      if (this.chatId()) {
        this.#chatManager.currentChatId.set(this.chatId());
      }
    });
  }

  sendMessage() {
    const currentChatId = this.chatId();
    if (currentChatId) {
      this.#chatManager
        .sendMessage(
          currentChatId,
          this.messageForm.value.message || '',
          this.#auth.user()?.id || '',
        )
        .then(() => {
          this.messageForm.reset();
        })
        .catch((error) => {
          console.error('Error sending messaage:', error);
        });
    }
  }
}
