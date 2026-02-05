import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TodoStatus } from '../todo.entity';

export class UpdateTodoDto {
  @IsEnum(TodoStatus)
  status: TodoStatus;

  @IsOptional()
  @IsString()
  problem_desc?: string;
}
