import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })  
  titulo: string;

  @Column({ nullable: true })  
  descripcion: string;

  @Column({ nullable: true, type: 'date' }) 
  fecha_limite: Date;

  @Column({ nullable: true })  
  estado: string;

  @Column({ nullable: true })  
  user_id: number;

}
