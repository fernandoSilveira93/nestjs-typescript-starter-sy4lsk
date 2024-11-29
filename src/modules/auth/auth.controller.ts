import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { KrakenService } from '../kraken/kraken.service';
import { FirebaseService } from '../firebase/firebase.service';
import { ValidateApiKeysDto } from './dto/validate-api-keys.dto';
import { UserId } from '../kraken/decorators/user-id.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly krakenService: KrakenService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post('validate-keys')
  @ApiOperation({ summary: 'Validate Kraken API Keys' })
  @ApiHeader({
    name: 'user-id',
    description: 'Firebase User ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'API keys validation result',
    schema: {
      type: 'object',
      properties: {
        valid: {
          type: 'boolean',
          example: true,
        },
      },
    },
  })
  async validateApiKeys(
    @UserId() userId: string,
    @Body() validateApiKeysDto: ValidateApiKeysDto,
  ) {
    try {
      await this.krakenService.getBalance(userId);
      await this.firebaseService.saveUserCredentials(userId, {
        apiKey: validateApiKeysDto.apiKey,
        apiSecret: validateApiKeysDto.apiSecret,
        updatedAt: new Date().toISOString(),
      });
      return { valid: true };
    } catch (error) {
      return { valid: false };
    }
  }
}