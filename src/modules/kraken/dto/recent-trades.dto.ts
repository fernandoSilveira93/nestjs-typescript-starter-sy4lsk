import { ApiProperty } from '@nestjs/swagger';

export class RecentTradeResponse {
  @ApiProperty({ example: 'XXBTZUSD' })
  pair: string;

  @ApiProperty({ example: '50000.00' })
  price: string;

  @ApiProperty({ example: '0.1000' })
  volume: string;

  @ApiProperty({ example: 'buy' })
  type: 'buy' | 'sell';

  @ApiProperty({ example: '1635724800' })
  time: number;
}