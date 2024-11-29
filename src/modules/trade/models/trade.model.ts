export interface Trade {
  id?: string;
  userId: string;
  pair: string;
  amount: number;
  price: number;
  type: 'buy' | 'sell';
  profit?: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}