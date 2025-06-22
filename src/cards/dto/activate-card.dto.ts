import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ActivateCardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty({ description: 'Password must be at least 8 characters long' })
  @IsString()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  password: string;
} 