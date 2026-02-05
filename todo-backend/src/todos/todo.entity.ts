import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TodoStatus {
  CREATED = 'created',
  ON_GOING = 'on_going',
  COMPLETED = 'completed',
  PROBLEM = 'problem',
}

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.CREATED,
  })
  status: TodoStatus;

  @Column({ nullable: true })
  problem_desc?: string;
}
