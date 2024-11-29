import { Module } from '@nestjs/common';
import { KrakenController } from './kraken.controller';
import { KrakenService } from './kraken.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [KrakenController],
  providers: [KrakenService],
  exports: [KrakenService],
})
export class KrakenModule {}