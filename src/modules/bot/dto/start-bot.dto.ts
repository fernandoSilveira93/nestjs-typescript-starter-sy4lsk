import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';

export class StartBotDto {
  @ApiProperty({
    description: 'Trading pair (e.g., BTCUSD)',
    example: 'BTCUSD',
  })
  @IsString()
  pair: string;

  @ApiProperty({
    description: 'Investment amount per interval',
    example: 100,
  })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: 'Investment interval in minutes',
    example: 1440, // 24 hours
  })
  @IsNumber()
  @IsPositive()
  interval: number;
}