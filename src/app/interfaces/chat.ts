import { serverTimestamp } from '@angular/fire/firestore';

export type Timestamp = ReturnType<typeof serverTimestamp>;

export interface Message {
  id?: string;
  text: string;
  senderId: string;
  timestamp: Timestamp;
}

export interface Chat {
  id?: string;
  participants: string[];
  createdAt: Timestamp;
}
