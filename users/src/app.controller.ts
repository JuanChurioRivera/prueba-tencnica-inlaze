import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {User} from './user.entity'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'user.getAll' })
  getUsers(): Promise<User[]> {
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: 'user.getOne' })
  async getUser(@Payload() id: number): Promise<User> {  
  return this.appService.findOne(id); 
  }

  @MessagePattern({ cmd: 'user.update' })
async update(@Payload() { id, ...userData }: { id: number; name: string; email: string }): Promise<User> {
  return this.appService.update(id, userData);
}

  @MessagePattern({ cmd: 'user.create' })
  async create(@Payload() userData: Partial<User>): Promise<User> {
    console.log(userData);
    return this.appService.create(userData);
  }

  @MessagePattern({ cmd: 'user.delete' })
  async delete(@Payload() { id }: { id: number }): Promise<string> {
    const result = await this.appService.delete(id);
  return result;
}
}
