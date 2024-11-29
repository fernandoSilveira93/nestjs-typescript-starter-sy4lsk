import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { TradeService } from './trade.service';
import { UserId } from '../kraken/decorators/user-id.decorator';
import { Transaction } from '../firebase/interfaces/user-credentials.interface';
import { TransactionDto } from './dto/transaction.dto';

@ApiTags('Trades')
@Controller('trades')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Get()
  @ApiOperation({ summary: 'Get user trades' })
  @ApiHeader({
    name: 'user-id',
    description: 'Firebase User ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User trades retrieved successfully',
    type: [TransactionDto]
  })
  async getUserTrades(@UserId() userId: string): Promise<Transaction[]> {
    return this.tradeService.getUserTrades(userId);
  }
}