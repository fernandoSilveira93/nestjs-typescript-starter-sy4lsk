import { ApiProperty } from '@nestjs/swagger';

export class AccountBalanceResponse {
  @ApiProperty({
    description: 'Account balances for each asset',
    example: {
      'XXBT': '0.1234',
      'ZUSD': '1000.00',
    },
  })
  balances: Record<string, string>;
}