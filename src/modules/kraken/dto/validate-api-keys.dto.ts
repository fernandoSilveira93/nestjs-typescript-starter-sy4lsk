import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ValidateApiKeysDto {
  @ApiProperty({
    description: 'Kraken API Key',
    example: 'your-api-key',
  })
  @IsString()
  @IsNotEmpty()
  apiKey: string;

  @ApiProperty({
    description: 'Kraken API Secret',
    example: 'your-api-secret',
  })
  @IsString()
  @IsNotEmpty()
  apiSecret: string;
}