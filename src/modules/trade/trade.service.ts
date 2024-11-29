import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Transaction } from '../firebase/interfaces/user-credentials.interface';

@Injectable()
export class TradeService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getUserTrades(userId: string): Promise<Transaction[]> {
    return this.firebaseService.getUserTransactions(userId);
  }
}