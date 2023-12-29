import { Controller, Get, Post, Body } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('create')
  async createItem(@Body() body: CreateItemDto) {
    return await this.itemService.createItem(body);
  }

  @Get('getItem')
  async getItem() {
    const item = await this.itemService.getItem();

    if (item) {
      return {
        status: 'success',
        data: item,
      };
    } else {
      return {
        status: 'error',
        message: 'Item não encontrado',
      };
    }
  }
}
