import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { ClientsService } from '../clients/clients.service';
import { CardStatus, CardType } from './entities/card.enums';
import { ActivateCardDto } from './dto/activate-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly clientsService: ClientsService,
  ) {}

  async requestCard(createCardDto: CreateCardDto): Promise<Card> {
    const client = await this.clientsService.findOne(createCardDto.clientId);

    // Basic income validation for credit card
    if (createCardDto.type === CardType.CREDIT && client.monthlyIncome < 1500) {
      throw new BadRequestException(
        'Minimum monthly income of 1500 is required for a credit card.',
      );
    }

    const cardNumber = this.generateCardNumber();
    const cvv = this.generateCvv();
    const expirationDate = this.generateExpirationDate();
    const limit = createCardDto.type === CardType.CREDIT ? 1000 : 0;

    const card = this.cardRepository.create({
      ...createCardDto,
      client,
      number: cardNumber,
      cvv,
      expirationDate,
      limit,
      status: CardStatus.REQUESTED,
    });

    const savedCard = await this.cardRepository.save(card);
    // Setting status to approved for demonstration purposes
    savedCard.status = CardStatus.APPROVED;
    return this.cardRepository.save(savedCard);
  }

  async activateCard(activateCardDto: ActivateCardDto): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: { number: activateCardDto.cardNumber },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (
      card.status !== CardStatus.APPROVED &&
      card.status !== CardStatus.DELIVERED
    ) {
      throw new ConflictException(
        `Card cannot be activated with status "${card.status}"`,
      );
    }

    card.status = CardStatus.ACTIVE;
    card.password = activateCardDto.password; // The hash is done by the entity's BeforeInsert/BeforeUpdate hook
    return this.cardRepository.save(card);
  }

  async blockCard(id: string): Promise<Card> {
    const card = await this.findOne(id);
    card.status = CardStatus.TEMP_BLOCKED;
    return this.cardRepository.save(card);
  }

  async cancelCard(id: string): Promise<Card> {
    const card = await this.findOne(id);
    card.status = CardStatus.CANCELED;
    return this.cardRepository.save(card);
  }

  findAll(): Promise<Card[]> {
    return this.cardRepository.find();
  }

  async findOne(id: string): Promise<Card> {
    const card = await this.cardRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
    return card;
  }

  // --- Private Helper Methods ---

  private generateCardNumber(): string {
    // Generates a 16-digit number
    return Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join(
      '',
    );
  }

  private generateCvv(): string {
    // Generates a 3-digit number
    return Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)).join(
      '',
    );
  }

  private generateExpirationDate(): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 5); // 5 years validity
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${year}`;
  }
}
