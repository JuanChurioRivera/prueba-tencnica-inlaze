import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {Todo} from './todo.entity'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'todo.getAll' })
  getTodos(): Promise<Todo[]> {
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: 'todo.getUser' })
  getTodoUser(@Payload() user_id: number): Promise<Todo[]> {
    console.log(user_id);
    return this.appService.findUser(user_id);
  }

  @MessagePattern({ cmd: 'todo.getOne' })
  async getTodo(@Payload() id: number): Promise<Todo> {  
  return this.appService.findOne(id); 
  }

  @MessagePattern({ cmd: 'todo.update' })
async update(@Payload() { id, ...todoData }: { id: number; titulo: string; descripcion: string, fecha_limite: Date, estado: string, user_id: number}): Promise<Todo> {
  return this.appService.update(id, todoData);
}

  @MessagePattern({ cmd: 'todo.create' })
  async create(@Payload() todoData: Partial<Todo>): Promise<Todo> {
    console.log(todoData);
    return this.appService.create(todoData);
  }

  @MessagePattern({ cmd: 'todo.delete' })
  async delete(@Payload() { id }: { id: number }): Promise<string> {
    const result = await this.appService.delete(id);
  return result;
}
}
