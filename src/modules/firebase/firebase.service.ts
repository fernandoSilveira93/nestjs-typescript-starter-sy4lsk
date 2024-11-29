import { Injectable, NotFoundException } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, Database } from 'firebase/database';
import { firebaseConfig } from '../../config/firebase.config';
import { UserCredentials, Transaction } from './interfaces/user-credentials.interface';

@Injectable()
export class FirebaseService {
  private db: Database;

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.db = getDatabase(app);
  }

  async getUserCredentials(userId: string): Promise<UserCredentials> {
    const userRef = ref(this.db, `users/${userId}/credentials`);
    const snapshot = await get(userRef);
    
    if (!snapshot.exists()) {
      throw new NotFoundException('User credentials not found');
    }

    return snapshot.val();
  }

  async saveUserCredentials(userId: string, credentials: UserCredentials): Promise<void> {
    const userRef = ref(this.db, `users/${userId}/credentials`);
    await set(userRef, credentials);
  }

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    const transactionsRef = ref(this.db, `users/${userId}/transactions`);
    const snapshot = await get(transactionsRef);
    
    if (!snapshot.exists()) {
      return [];
    }

    return Object.values(snapshot.val());
  }
}