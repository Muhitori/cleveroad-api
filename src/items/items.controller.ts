import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { diskStorage } from 'multer'
import { extname } from 'path'
import { Public } from 'src/decorators/public.decorator';
import { CreateItemDto } from './dto/createItem.dto';
import { UpdateItemDto } from './dto/updateItem.dto';
import { ItemsService } from './items.service';

@Controller('api/items')
export class ItemsController {
  SERVER_URL: string = 'http://localhost:3000/'
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
    return response.json({})
  }

  @Header('Content-Type', 'multipart/form-data')
  @Post(':id/images')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, cb) => {
          return file.originalname
        }
      })
    })
  )
  uploadImage(
    @Req() request: Request,
    @Param('id') id: number,
    @UploadedFile() file
  ) {
    const userId = request.user['id']
    console.log(`${this.SERVER_URL}${file.path}`)
    //return this.itemsService.uploadImage(id, userId, `${this.SERVER_URL}${image.path}`)
  }
}
