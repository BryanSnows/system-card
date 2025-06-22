import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CardFlag, CardType } from '../entities/card.enums';

export class CreateCardDto {
  @ApiProperty({ description: 'Client ID' })
  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ enum: CardType })
  @IsEnum(CardType)
  @IsNotEmpty()
  type: CardType;

  @ApiProperty({ enum: CardFlag })
  @IsEnum(CardFlag)
  @IsNotEmpty()
  flag: CardFlag;

  @ApiProperty({
    description: 'Name to be printed on the card',
    example: 'J DOE',
  })
  @IsString()
  @IsNotEmpty()
  cardHolderName: string;
} 