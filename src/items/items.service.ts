import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'entities/Item.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ItemDto } from './dto/item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
    private usersService: UsersService
  ) {}

  async getItems(): Promise<ItemDto[] | []> {
    let items: ItemDto[] = await this.itemRepo.find();
    
    return items
  }

  async getItemById(id: number): Promise<ItemDto | undefined> {
    return this.itemRepo.findOne(id)
  }
}
