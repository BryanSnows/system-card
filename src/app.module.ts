import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './configs/database/typeorm.config';
import { CardsModule } from './cards/cards.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ConfigModule.forRoot({ isGlobal: true }),
    CardsModule,
    ClientsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
