import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseInterceptors, UploadedFile, Catch, PayloadTooLargeException, UseFilters } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Request, Response } from 'express'
import * as fs from 'fs'
import { Public } from 'src/decorators/public.decorator'
import { HttpExceptionFilter } from './httpEcxeption.filter'
import { CreateItemDto } from './dto/createItem.dto'
import { UpdateItemDto } from './dto/updateItem.dto'
import { ItemsService } from './items.service'
import { multerOptions } from 'config/storage.config'

@Controller('api/items')
export class ItemsController {
  private SERVER_URL: string = 'http://localhost:3000'
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

  @Header('Content-Type', 'application/json')
  @Post()
  async createItem(@Req() request: Request, @Body() item: CreateItemDto) {
    const userId = request.user['id']
    return this.itemsService.createItem(userId, item)
  }

  @Header('Content-Type', 'application/json')
  @Put(':id')
  async updateItem(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() item: UpdateItemDto
  ) {
    const userId = request.user['id']
    return this.itemsService.updateItem(id, userId, item)
  }

  @Delete(':id')
  async deleteItem(
    @Req() request: Request,
    @Param('id') id: number,
    @Res() response: Response
  ) {
    const userId = request.user['id']
    this.itemsService.deleteItem(id, userId)
    return response.status(200).json({})
  }

  @Post(':id/images')
  @UseFilters(new HttpExceptionFilter())
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadImage(@Req() request: Request, @Param('id') id: number, @UploadedFile() image) {
    const dir = `${__dirname}/../../../images`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    const userId = request.user['id']
    const url = `${this.SERVER_URL}/images/${image.filename}`
    
    return this.itemsService.uploadImage(id, userId, url)
  }
}
