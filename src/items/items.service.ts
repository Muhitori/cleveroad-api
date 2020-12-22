import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'entities/Item.entity';
import { resolve } from 'path';
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
    return await this.itemRepo.find({
      join: {
        alias: 'items',
        leftJoinAndSelect: {
          user: 'items.user'
        }
      }
    })
  }

  async getItemById(id: number): Promise<ItemDto | undefined> {
    const item = await this.itemRepo.findOne({
      join: {
        alias: 'items',
        leftJoinAndSelect: {
          user: 'items.user',
        }
      }
    })

    return item
  }

  async createItem() {

  }

  async updateItem(item: ItemDto, id: number) {
    
  }

  async deleteItem(id: number) {

  }

  async uploadPhoto() {

  }
}
