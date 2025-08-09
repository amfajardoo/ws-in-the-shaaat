import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentReference,
  Firestore,
  Query,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';

interface DocumentWithId {
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataClient {
  #firestore = inject(Firestore);

  getCollectionRef<T>(path: string): CollectionReference<T> {
    return collection(this.#firestore, path) as CollectionReference<T>;
  }

  getDocRef<T>(path: string, id: string): DocumentReference<T> {
    return doc(this.#firestore, path, id) as DocumentReference<T>;
  }

  createQuery<T>(path: string, ...queryConstraints: any[]): Query<T> {
    return query(this.getCollectionRef<T>(path), ...queryConstraints);
  }

  // --- Métodos de Operaciones ---
  async create<T>(path: string, data: T): Promise<string> {
    const docRef = await addDoc(this.getCollectionRef<T>(path), data);
    return docRef.id;
  }

  async getById<T>(path: string, id: string): Promise<T | null> {
    const docSnap = await getDoc(this.getDocRef<T>(path, id));
    return docSnap.exists()
      ? ({ id: docSnap.id, ...docSnap.data() } as T)
      : null;
  }

  async set<T>(path: string, id: string, data: T): Promise<void> {
    await setDoc(this.getDocRef<T>(path, id), data);
  }

  async getMany<T>(q: Query<T>): Promise<T[]> {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as T,
    );
  }

  streamMany<T extends DocumentWithId>(q: Query<T>): Observable<T[]> {
    return collectionData(q, { idField: 'id' }) as Observable<T[]>;
  }

  async exists<T>(path: string, id: string): Promise<boolean> {
    const docRef = this.getDocRef<T>(path, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }
}
