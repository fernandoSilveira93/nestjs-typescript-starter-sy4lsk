import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class KrakenService {
  private readonly apiUrl = 'https://api.kraken.com';
  
  constructor(private readonly firebaseService: FirebaseService) {}

  async getBalance(userId: string) {
    const credentials = await this.firebaseService.getUserCredentials(userId);
    const path = '/0/private/Balance';
    return this.makePrivateRequest(path, {}, credentials.apiKey, credentials.apiSecret);
  }

  async getRecentTrades(userId: string) {
    const credentials = await this.firebaseService.getUserCredentials(userId);
    const path = '/0/private/TradesHistory';
    return this.makePrivateRequest(path, {}, credentials.apiKey, credentials.apiSecret);
  }

  private async makePrivateRequest(
    path: string,
    data: Record<string, any> = {},
    apiKey: string,
    apiSecret: string,
  ) {
    const nonce = Date.now().toString();
    const postData = new URLSearchParams({ nonce, ...data }).toString();
    
    const signature = this.generateSignature(path, nonce, postData, apiSecret);
    
    try {
      const response = await axios.post(`${this.apiUrl}${path}`, postData, {
        headers: {
          'API-Key': apiKey,
          'API-Sign': signature,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.error || 'Error making request to Kraken API',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private generateSignature(
    path: string,
    nonce: string,
    postData: string,
    apiSecret: string,
  ): string {
    const message = nonce + postData;
    const secret = Buffer.from(apiSecret, 'base64');
    const hash = crypto.createHash('sha256');
    const hmac = crypto.createHmac('sha512', secret);
    const hash_digest = hash.update(nonce + message).digest('binary');
    const hmac_digest = hmac.update(path + hash_digest, 'binary').digest('base64');

    return hmac_digest;
  }
}