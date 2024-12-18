import { Controller, Get, Inject, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {CreateUserRequest} from './Dto/user.dto';
import {CreateTodoRequest} from './Dto/todo.dto';

@Controller()
export class AppController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
    @Inject('TODO_SERVICE') private readonly todosService: ClientProxy
  ) {}

  @Get('users')
  async getUsers() {
    const response = await lastValueFrom(
      this.usersService.send({ cmd: 'user.getAll' }, {})
    );
    return response;
  }

  @Get('users/:id')  
async getUser(@Param('id') id: number) {
  try {
    const response = await lastValueFrom(
      this.usersService.send({ cmd: 'user.getOne' }, id)
    );
    console.log('User retrieved:', response);
    return response;
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error;
  }
}


  @Post('users')
  async createUser(@Body() createUserDto: CreateUserRequest) {
    try {
       const response = await lastValueFrom(
        this.usersService.send({ cmd: 'user.create' }, createUserDto),
      );
      console.log('User created:', response); 
      return response; 
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; 
    }
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: number,@Body() createUserDto: CreateUserRequest) {
    try {
       const response = await lastValueFrom(
        this.usersService.send({ cmd: 'user.update' }, {id, ...createUserDto}),
      );
      console.log('User created:', response); 
      return response; 
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; 
    }
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: number) {
    try {
      // Send the id to the user service for deletion
      const response = await lastValueFrom(
        this.usersService.send({ cmd: 'user.delete' }, { id })
      );
      console.log('User deleted:', response);
      return response;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  ///

  @Get('todos')
  async getTodos() {
    const response = await lastValueFrom(
      this.todosService.send({ cmd: 'todo.getAll' }, {})
    );
    return response;
  }

  @Get('todos/:id')  
async getTodo(@Param('id') id: number) {

  
  try {
    const response = await lastValueFrom(
      this.todosService.send({ cmd: 'todo.getOne' }, id)
    );
    console.log('Todo retrieved:', response);
    return response;
  } catch (error) {
    console.error('Error retrieving todo:', error);
    throw error;
  }
}

@Get('todos/user/:id')  
async getTodoUser(@Param('id') user_id: number) {

  try {
    const response = await lastValueFrom(
      this.todosService.send({ cmd: 'todo.getUser' }, user_id)
    );
    console.log('Todo retrieved:', response);
    return response;
  } catch (error) {
    console.error('Error retrieving todo:', error);
    throw error;
  }
}

  @Post('todos')
  async createTodo(@Body() createTodoDto: CreateTodoRequest) {
    try {
       const response = await lastValueFrom(
        this.todosService.send({ cmd: 'todo.create' }, createTodoDto),
      );
      console.log('Todo created:', response); 
      return response; 
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error; 
    }
  }

  @Put('todos/:id')
  async updateTodo(@Param('id') id: number,@Body() createTodoDto: CreateTodoRequest) {
    try {
       const response = await lastValueFrom(
        this.todosService.send({ cmd: 'todo.update' }, {id, ...createTodoDto}),
      );
      console.log('Todo created:', response); 
      return response; 
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error; 
    }
  }

  @Delete('todos/:id')
  async deleteTodo(@Param('id') id: number) {
    try {
      // Send the id to the todo service for deletion
      const response = await lastValueFrom(
        this.todosService.send({ cmd: 'todo.delete' }, { id })
      );
      console.log('Todo deleted:', response);
      return response;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
}
