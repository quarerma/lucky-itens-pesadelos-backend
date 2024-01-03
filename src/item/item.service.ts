import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemModel } from './model/item.model';
import { TotalService } from 'src/total/total.service';
import * as cache from 'memory-cache';
import { AlreadyOnDbException } from 'src/exceptions/AlreadyOnDbException';
import { ErrorOnCreateItemException } from 'src/exceptions/ErrorOnCreateItemException';

@Injectable()
export class ItemService {
  constructor(
    private databaseService: DataBaseService,
    private totalService: TotalService,
  ) {}

  private getLastSortedItem(): ItemModel | null {
    return cache.get('lastSortedItem') || null;
  }

  private async getLuckyNumber(): Promise<number> {
    const total: number = await this.totalService.getTotal();
    const randomNumber: number = Math.floor(Math.random() * total) + 1;
    return randomNumber;
  }

  private async getAllItens(): Promise<ItemModel[]> {
    return await this.databaseService.item.findMany();
  }

  async getItem(): Promise<ItemModel | null> {
    const allItens: ItemModel[] = await this.getAllItens();

    const luckyNumber: number = await this.getLuckyNumber();
    const lastSortedItem: ItemModel = this.getLastSortedItem();

    let sumProbability: number = 1;
    console.log(cache.get('lastSortedItem'));
    for (const item of allItens) {
      sumProbability += item.probability;

      if (luckyNumber <= sumProbability) {
        if (lastSortedItem && lastSortedItem.name === item.name) {
          return this.getItem();
        }
        cache.put('lastSortedItem', item);
        return item;
      }
    }
    return null;
  }

  async createItem(body: CreateItemDto) {
    let rarityProbability: number;

    switch (body.rarity) {
      case 'COMMON':
        rarityProbability = 20;
        break;
      case 'RARE':
        rarityProbability = 10;
        break;
      case 'EPIC':
        rarityProbability = 5;
        break;
      case 'LEGENDARY':
        rarityProbability = 1;
        break;
      default:
        rarityProbability = 0;
    }
    try {
      const existingItem = await this.databaseService.item.findUnique({
        where: { name: body.name },
      });

      if (existingItem) {
        console.log('Item já existe!');
        throw new AlreadyOnDbException();
      }

      await this.totalService.updateTotal(rarityProbability);
      console.log('Item criado com sucesso!');

      await this.databaseService.item.create({
        data: {
          name: body.name,
          rarity: body.rarity,
          probability: rarityProbability,
        },
      });
    } catch (error) {
      if (error instanceof AlreadyOnDbException) {
        throw error;
      } else {
        throw new ErrorOnCreateItemException();
      }
    }
  }
}
