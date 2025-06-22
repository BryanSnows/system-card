import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Card } from './entities/card.entity';
import { ActivateCardDto } from './dto/activate-card.dto';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post('request')
  @ApiOperation({ summary: 'Request a new card' })
  @ApiResponse({
    status: 201,
    description: 'The card has been successfully requested.',
    type: Card,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  requestCard(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.requestCard(createCardDto);
  }

  @Patch('activate')
  @ApiOperation({ summary: 'Activate a card' })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully activated.',
    type: Card,
  })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  activateCard(@Body() activateCardDto: ActivateCardDto) {
    return this.cardsService.activateCard(activateCardDto);
  }

  @Patch(':id/block')
  @ApiOperation({ summary: 'Temporarily block a card' })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully blocked.',
    type: Card,
  })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  blockCard(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.blockCard(id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Permanently cancel a card' })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully canceled.',
    type: Card,
  })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  cancelCard(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.cancelCard(id);
  }

  @Get()
  @ApiOperation({ summary: 'List all cards' })
  @ApiResponse({
    status: 200,
    description: 'A list of all cards.',
    type: [Card],
  })
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a card by ID' })
  @ApiResponse({ status: 200, description: 'The card details.', type: Card })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.findOne(id);
  }
}
