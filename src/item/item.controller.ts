import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { AlreadyOnDbException } from 'src/exceptions/AlreadyOnDbException';
import { ErrorOnCreateItemException } from 'src/exceptions/ErrorOnCreateItemException';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('create')
  async createItem(@Body() body: CreateItemDto) {
    try {
      if (body.name === '') throw new ErrorOnCreateItemException();
      await this.itemService.createItem(body);
      return {
        status: 'success',
        message: 'Item criado com sucesso',
      };
    } catch (error) {
      if (error instanceof AlreadyOnDbException) {
        throw new HttpException(
          {
            status: 'error',
            message: 'Item já cadastrado',
          },
          HttpStatus.CONFLICT,
        );
      } else if (error instanceof ErrorOnCreateItemException) {
        throw new HttpException(
          {
            status: 'error',
            message: 'Erro ao criar item',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
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
