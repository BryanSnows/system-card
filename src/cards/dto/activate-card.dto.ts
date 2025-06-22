import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ActivateCardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty({ description: '6-digit password' })
  @IsString()
  @Length(6, 6, { message: 'Password must be 6 digits' })
  password: string;
} 