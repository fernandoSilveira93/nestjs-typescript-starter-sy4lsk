import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { KrakenModule } from '../kraken/kraken.module';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [KrakenModule, FirebaseModule],
  controllers: [AuthController],
})
export class AuthModule {}