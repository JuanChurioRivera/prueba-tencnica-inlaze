import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }


  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }


  async update(id: number, userData: Partial<User>): Promise<User> {
    // Find the user by id
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    console.log(userData);

    user.email = userData.email || user.email;
    user.password = userData.password || user.password;
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id } });
  
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.remove(user);
    return `User with ID ${id} deleted successfully`;
  }
}
