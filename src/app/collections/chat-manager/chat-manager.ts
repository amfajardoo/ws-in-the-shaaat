import { inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from '@angular/fire/firestore';
import { map, of } from 'rxjs';
import { collections, subCollections } from '..';

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: any; // Use appropriate type for timestamp
}

export interface Chat {
  participants: string[];
  createdAt: any; // Use appropriate type for timestamp,
}

@Injectable({
  providedIn: 'root',
})
export class ChatManager {
  #firestore = inject(Firestore);
  currentChatId = signal<string | null>(null);
  messagesResource = rxResource({
    params: this.currentChatId,
    stream: ({ params }) => {
      const chatId = params;
      if (!chatId) {
        return of([]);
      }

      return this.#loadMessages(chatId);
    },
  });

  async getUserChats(userId: string) {
    const chatsRef = collection(this.#firestore, collections.chats);
    const q = query(chatsRef, where('participants', 'array-contains', userId));

    return await getDocs(q);
  }

  async verifyChatExists(
    userId: string,
    contactId: string,
  ): Promise<string | null> {
    const querySnapshot = await this.getUserChats(userId);
    for (const docSnap of querySnapshot.docs) {
      const chat = docSnap.data() as Chat;
      const participants = chat.participants;

      if (participants.includes(contactId)) {
        return docSnap.id;
      }
    }

    return null;
  }

  async createChat(participants: string[]): Promise<string> {
    const chatRef = collection(this.#firestore, collections.chats);
    const docRef = await addDoc(chatRef, {
      participants,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  }

  async sendMessage(
    chatId: string,
    message: string,
    senderId: string,
  ): Promise<string> {
    const messagesRef = collection(
      this.#firestore,
      `${collections.chats}/${chatId}/${subCollections[collections.chats].messages}`,
    );

    const messageData = {
      text: message,
      senderId: senderId,
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(messagesRef, messageData);

    return docRef.id;
  }

  #loadMessages(chatId: string) {
    const messagesRef = collection(
      this.#firestore,
      `${collections.chats}/${chatId}/${subCollections[collections.chats].messages}`,
    );
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    return collectionData(q, { idField: 'id' }).pipe(
      map((messages) => {
        return messages.map((message) => ({
          ...message,
        })) as Message[];
      }),
    );
  }
}
