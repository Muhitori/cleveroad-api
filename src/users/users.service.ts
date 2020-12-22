import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/User.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/User.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }
  
  async findByEmail(email: string): Promise<UserDto | null> {
    return this.userRepo.findOne({ email: email })
  }

  async getUserById(id: number): Promise<UserDto | null> {
    return this.userRepo.findOne(id)
  }

  async findAll(): Promise<UserDto[] | []> {
    return this.userRepo.find()
  }

  async createUser(user: UserDto) {
    return this.userRepo.insert(user)
  }
}
