import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CardFlag, CardStatus, CardType } from './card.enums';
import { Client } from '../../clients/entities/client.entity';
import * as bcrypt from 'bcrypt';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  number: string;

  @Column({ name: 'card_holder_name' })
  cardHolderName: string;

  @Column({ type: 'enum', enum: CardFlag })
  flag: CardFlag;

  @Column({ type: 'enum', enum: CardType })
  type: CardType;

  @Column({ name: 'cvv' })
  cvv: string;

  @Column({ name: 'expiration_date' })
  expirationDate: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  limit: number;

  @Column({ type: 'enum', enum: CardStatus, default: CardStatus.REQUESTED })
  status: CardStatus;

  @Column({ nullable: true })
  password?: string;

  @ManyToOne(() => Client, (client) => client.cards, { eager: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const isHashed = this.password.startsWith('$2b$');
      if (!isHashed) {
        this.password = await bcrypt.hash(this.password, 10);
      }
    }
  }
} 