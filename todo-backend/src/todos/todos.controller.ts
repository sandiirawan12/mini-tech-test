import {
    Controller,
    Get,
    Post,
    Patch,
    Body,
    Param,
    Query,
  } from '@nestjs/common';
  
  import { TodosService } from './todos.service';
  import { CreateTodoDto } from './dto/create-todo.dto';
  import { UpdateTodoDto } from './dto/update-todo.dto';
  
  @Controller('api/todos')
  export class TodosController {
    constructor(private readonly service: TodosService) {}
  
    @Get()
    getTodos(@Query('search') search?: string) {
      return this.service.findAll(search);
    }
  
    @Post()
    createTodo(@Body() dto: CreateTodoDto) {
      return this.service.create(dto);
    }
  
    @Patch(':id')
    updateTodo(
      @Param('id') id: string,
      @Body() dto: UpdateTodoDto,
    ) {
      return this.service.update(+id, dto);
    }
  }
  