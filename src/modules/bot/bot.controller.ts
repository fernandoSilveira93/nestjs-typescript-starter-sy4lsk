import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DCAStrategy } from './strategies/dca.strategy';
import { StartBotDto } from './dto/start-bot.dto';

@ApiTags('Bot')
@Controller('bot')
export class BotController {
  constructor(private readonly dcaStrategy: DCAStrategy) {}

  @Post('start')
  @ApiOperation({ summary: 'Start the trading bot' })
  @ApiResponse({ 
    status: 201, 
    description: 'Bot started successfully',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'running',
        },
        config: {
          type: 'object',
          properties: {
            pair: { type: 'string' },
            amount: { type: 'number' },
            interval: { type: 'number' },
          },
        },
      },
    },
  })
  async startBot(@Body() startBotDto: StartBotDto) {
    await this.dcaStrategy.execute(startBotDto);
    return {
      status: 'running',
      config: startBotDto,
    };
  }

  @Get('status')
  @ApiOperation({ summary: 'Get bot status' })
  @ApiResponse({
    status: 200,
    description: 'Current bot status',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'running',
        },
        lastTrade: {
          type: 'object',
          properties: {
            timestamp: { type: 'string' },
            pair: { type: 'string' },
            amount: { type: 'number' },
            price: { type: 'number' },
          },
        },
      },
    },
  })
  getBotStatus() {
    return {
      status: 'running',
      lastTrade: {
        timestamp: new Date().toISOString(),
        pair: 'BTCUSD',
        amount: 0.001,
        price: 50000,
      },
    };
  }
}