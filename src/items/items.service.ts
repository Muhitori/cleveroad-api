import { ForbiddenException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'entities/Item.entity';
import { response } from 'express';
import { resolve } from 'path';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/createItem.dto';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/updateItem.dto';

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
      where: { id },
      join: {
        alias: 'items',
        leftJoinAndSelect: {
          user: 'items.user'
        }
      }
    })

    if (!item) {
      throw new NotFoundException({})
    }

    return item
  }

  async createItem(userId: number, item: CreateItemDto) {
    if (!item) {
      throw new UnprocessableEntityException({
        message: 'item is null'
      })
    }

    this.checkFields(<ItemDto>item)

    item.userId = userId

    const createdItem = await this.itemRepo.save(item)

    return this.getItemById(createdItem.id)
  }

  async updateItem(id: number, userId: number, item: UpdateItemDto) {
    const oldItem = await this.itemRepo.findOne(id)

    this.checkAccess(userId, <ItemDto>oldItem)

    if (item.title.length < 3) {
      throw new UnprocessableEntityException({
        field: 'title',
        message: 'Title should contain at least 3 characters'
      })
    }

    await this.itemRepo.update(id, { title: item.title, price: item.price })
    return this.getItemById(id)
  }

  async deleteItem(id: number, userId: number) {
    const item = await this.itemRepo.findOne(id)

    this.checkAccess(userId, item)

    return this.itemRepo.delete(id)
  }

  async uploadImage(id: number, userId: number, imageUrl: string) {
    const oldItem = await this.itemRepo.findOne(id)

    this.checkAccess(userId, <ItemDto>oldItem)

    await this.itemRepo.update(id, {image: imageUrl})
    
    return this.getItemById(id)
  }

  checkAccess(userId: number, item: ItemDto) {
    if (!item) {
      throw new NotFoundException({})
    }

    if (item.userId != userId) {
      throw new ForbiddenException({})
    }
  }

  checkFields(item: ItemDto) {
    if (item.title.length < 3) {
      throw new UnprocessableEntityException({
        field: 'title',
        message: 'Title should contain at least 3 characters'
      })
    }

    if (!item.price) {
      throw new UnprocessableEntityException({
        field: 'price',
        message: 'price is required'
      })
    }
  }
}
