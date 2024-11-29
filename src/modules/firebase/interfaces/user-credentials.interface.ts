export interface UserCredentials {
  apiKey: string;
  apiSecret: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  pair: string;
  amount: number;
  price: number;
  total: number;
  profit: number;
  type: 'buy' | 'sell';
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
}

export interface FirebaseUser {
  credentials: UserCredentials;
  transactions: Record<string, Transaction>;
}