
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar' })
  role: string;

  @Column({ type: 'integer' })
  efficiency: number;
}
