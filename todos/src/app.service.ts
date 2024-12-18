import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { todo } from 'node:test';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  
  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findUser(user_id: number): Promise<Todo[]> {
    const todos = await this.todoRepository.find({
      where: { user_id }
    });
    console.log(todos);
    return todos;
  }


  async findOne(id: number): Promise<Todo | null> {
    return this.todoRepository.findOneBy({ id });
  }

  async create(userData: Partial<Todo>): Promise<Todo> {
    const newUser = this.todoRepository.create(userData);
    return this.todoRepository.save(newUser);
  }


  async update(id: number, todoData: Partial<Todo>): Promise<Todo> {

    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new Error('Todo not found');
    }

    console.log(todoData);

    todo.titulo = todoData.titulo;
    todo.descripcion = todoData.descripcion;
    todo.estado = todoData.descripcion;
    todo.user_id = todoData.user_id;

    return this.todoRepository.save(todo);
  }

  async delete(id: number): Promise<string> {
    const user = await this.todoRepository.findOne({ where: { id } });
  
    if (!user) {
      throw new Error('todo not found');
    }
    await this.todoRepository.remove(user);
    return `todo with ID ${id} deleted successfully`;
  }
}
