import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty({ example: '-OCp47MSt6y5BntdiFxC' })
  id: string;

  @ApiProperty({ example: 'BTC/USD' })
  pair: string;

  @ApiProperty({ example: 0.1 })
  amount: number;

  @ApiProperty({ example: 50000 })
  price: number;

  @ApiProperty({ example: 5000 })
  total: number;

  @ApiProperty({ example: 250 })
  profit: number;

  @ApiProperty({ enum: ['buy', 'sell'], example: 'buy' })
  type: 'buy' | 'sell';

  @ApiProperty({ enum: ['pending', 'success', 'failed'], example: 'success' })
  status: 'pending' | 'success' | 'failed';

  @ApiProperty({ example: '2024-11-28T23:21:17.296Z' })
  timestamp: string;
}