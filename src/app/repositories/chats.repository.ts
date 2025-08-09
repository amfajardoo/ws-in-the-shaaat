// chats.repository.ts
import { Injectable, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { orderBy, serverTimestamp, where } from '@angular/fire/firestore';
import { Chat, Message } from '@interfaces/chat';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseDataClient } from '../firebase-data.client';

@Injectable({
  providedIn: 'root',
})
export class ChatsRepository {
  #firebase = inject(FirebaseDataClient);
  currentChatId = signal<string | null>(null);

  messagesResource = rxResource({
    params: this.currentChatId,
    stream: ({ params }) => {
      const chatId = params;
      if (!chatId) {
        return of([]);
      }
      return this.loadMessages(chatId);
    },
  });

  async createChat(participants: string[]): Promise<string> {
    const chatData: Chat = {
      participants,
      createdAt: serverTimestamp(),
    };
    return this.#firebase.create<Partial<Chat>>('chats', chatData);
  }

  async sendMessage(
    chatId: string,
    message: string,
    senderId: string,
  ): Promise<string> {
    const messagesPath = `${'chats'}/${chatId}/messages`;
    const messageData: Message = {
      text: message,
      senderId: senderId,
      timestamp: serverTimestamp(),
    };
    return this.#firebase.create<Partial<Message>>(messagesPath, messageData);
  }

  private loadMessages(chatId: string) {
    const messagesPath = `${'chats'}/${chatId}/messages`;
    const q = this.#firebase.createQuery<Message>(
      messagesPath,
      orderBy('timestamp', 'asc'),
    );
    return this.#firebase
      .streamMany<Message>(q)
      .pipe(map((messages) => messages.map((message) => ({ ...message }))));
  }

  async getUserChats(userId: string): Promise<Chat[]> {
    const q = this.#firebase.createQuery<Chat>(
      'chats',
      where('participants', 'array-contains', userId),
    );
    return this.#firebase.getMany<Chat>(q);
  }

  async verifyChatExists(
    userId: string,
    contactId: string,
  ): Promise<string | null> {
    const chats = await this.getUserChats(userId);
    const existingChat = chats.find((chat) =>
      chat.participants.includes(contactId),
    );
    return existingChat && existingChat.id ? existingChat.id : null;
  }
}
