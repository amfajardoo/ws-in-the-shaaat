import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: Timestamp;
}
