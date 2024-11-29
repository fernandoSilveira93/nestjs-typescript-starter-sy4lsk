import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { KrakenService } from './kraken.service';
import { UserId } from './decorators/user-id.decorator';

@ApiTags('Kraken')
@Controller('kraken')
export class KrakenController {
  constructor(private readonly krakenService: KrakenService) {}

  @Get('balance')
  @ApiOperation({ summary: 'Get account balance' })
  @ApiHeader({
    name: 'user-id',
    description: 'Firebase User ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Account balance retrieved successfully'
  })
  async getBalance(@UserId() userId: string) {
    return this.krakenService.getBalance(userId);
  }

  @Get('recent-trades')
  @ApiOperation({ summary: 'Get recent trades' })
  @ApiHeader({
    name: 'user-id',
    description: 'Firebase User ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Recent trades retrieved successfully'
  })
  async getRecentTrades(@UserId() userId: string) {
    return this.krakenService.getRecentTrades(userId);
  }
}