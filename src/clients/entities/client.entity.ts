import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from '../../cards/entities/card.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column({ unique: true })
  cpf: string;

  @Column({ name: 'monthly_income', type: 'decimal', precision: 10, scale: 2 })
  monthlyIncome: number;

  @OneToMany(() => Card, (card) => card.client)
  cards: Card[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 