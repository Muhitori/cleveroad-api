import { Get, Injectable } from '@nestjs/common';
import { User } from 'entities/User.entity';
import { getConnection, Repository } from 'typeorm';
import { UserDto } from './dto/User.dto'

@Injectable()
export class UsersService {

  async findByName(name: string): Promise<UserDto | undefined> {
    return getConnection().getRepository(User).findOne({ name: name })
  }

  async findAll(): Promise<UserDto[] | undefined> {
    return getConnection().getRepository(User).find()
  }

}
