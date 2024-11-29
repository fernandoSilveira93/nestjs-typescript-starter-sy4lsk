import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KrakenModule } from './modules/kraken/kraken.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { TradeModule } from './modules/trade/trade.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule,
    KrakenModule,
    TradeModule,
    AuthModule,
  ],
})
export class AppModule {}