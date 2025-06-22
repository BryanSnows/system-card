import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Client } from 'src/clients/entities/client.entity';
import { ClientsModule } from 'src/clients/clients.module';


@Module({
  imports: [TypeOrmModule.forFeature([Card]), ClientsModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {} 