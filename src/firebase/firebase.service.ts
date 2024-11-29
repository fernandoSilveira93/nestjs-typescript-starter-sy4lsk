import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, Database } from 'firebase/database';

@Injectable()
export class FirebaseService {
  private db: Database;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBjnIiDNiQfUtbJAjkxXABF7RWCt8SoHQs",
      authDomain: "bot-trading-fdc3c.firebaseapp.com",
      databaseURL: "https://bot-trading-fdc3c-default-rtdb.firebaseio.com",
      projectId: "bot-trading-fdc3c",
      storageBucket: "bot-trading-fdc3c.firebasestorage.app",
      messagingSenderId: "166852937109",
      appId: "1:166852937109:web:eb89addfe97be030bf629c",
      measurementId: "G-M0ZWNPL4VB"
    };

    const app = initializeApp(firebaseConfig);
    this.db = getDatabase(app);
  }

  async saveUserApiKeys(userId: string, apiKey: string, apiSecret: string): Promise<void> {
    const userRef = ref(this.db, `users/${userId}/apiKeys`);
    await set(userRef, {
      apiKey,
      apiSecret,
      updatedAt: new Date().toISOString()
    });
  }

  async getUserApiKeys(userId: string): Promise<{ apiKey: string; apiSecret: string }> {
    const userRef = ref(this.db, `users/${userId}/apiKeys`);
    const snapshot = await get(userRef);
    
    if (!snapshot.exists()) {
      throw new Error('API keys not found for user');
    }

    const data = snapshot.val();
    return {
      apiKey: data.apiKey,
      apiSecret: data.apiSecret
    };
  }
}