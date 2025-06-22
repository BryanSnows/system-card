import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './clients/clients.controller';
import { ClientsService } from './clients/clients.service';
import { CardsController } from './cards/cards.controller';
import { CardsService } from './cards/cards.service';
import { AppDataSource } from './configs/database/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ConfigModule.forRoot({ isGlobal: true }),

  ],
  controllers: [AppController, ClientsController, CardsController],
  providers: [AppService, ClientsService, CardsService],
})
export class AppModule {}
