import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { CardStatus } from '../entities/card.enums';
import { ApiProperty } from '@nestjs/swagger';

class CardStatusDto {
  @ApiProperty({ enum: CardStatus })
  @IsEnum(CardStatus)
  @IsOptional()
  status: CardStatus;
}

export class UpdateCardDto extends PartialType(CardStatusDto) {} 