import { Controller, Get, Param, Req } from '@nestjs/common';
import { Public } from 'src/public.decorator';
import { ItemsService } from './items.service';

@Controller('api/items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Public()
  @Get()
  async getAllItems() {
    return this.itemsService.getItems()
  }

  @Public()
  @Get(':id')
  async getItemById(@Param('id') id: number) {
    return this.itemsService.getItemById(id)
  }
}
