import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly repo: Repository<Todo>,
  ) {}

  findAll(search?: string) {
    if (!search) {
      return this.repo.find();
    }

    return this.repo.find({
      where: { title: ILike(`%${search}%`) },
    });
  }

  create(dto: CreateTodoDto) {
    const todo = this.repo.create(dto);
    return this.repo.save(todo);
  }

  async update(id: number, dto: UpdateTodoDto) {
    const todo = await this.repo.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    Object.assign(todo, dto);
    return this.repo.save(todo);
  }
}
