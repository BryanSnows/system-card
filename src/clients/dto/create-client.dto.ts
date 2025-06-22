import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Min,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAdult', async: false })
export class IsAdult implements ValidatorConstraintInterface {
  validate(birthDate: string) {
    const today = new Date();
    const date = new Date(birthDate);
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    return age >= 18;
  }

  defaultMessage() {
    return 'Client must be at least 18 years old';
  }
}

export class CreateClientDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '2000-01-01' })
  @IsDateString()
  @Validate(IsAdult)
  birthDate: Date;

  @ApiProperty()
  @IsString()
  @Matches(/^[0-9]{11}$/, { message: 'CPF must be 11 digits' })
  cpf: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  monthlyIncome: number;
} 