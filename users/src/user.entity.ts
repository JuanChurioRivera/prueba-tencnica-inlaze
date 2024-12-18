import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })  // Allow email to be nullable
  email: string;

  @Column({ nullable: true })  // Allow email to be nullable
  password: string;



  // Add other fields as necessary
}
