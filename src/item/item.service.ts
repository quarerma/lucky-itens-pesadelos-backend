import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemModel } from './model/item.model';
import { TotalService } from 'src/total/total.service';

@Injectable()
export class ItemService {
  constructor(
    private databaseService: DataBaseService,
    private totalService: TotalService,
  ) {}

  async getLuckyNumber(): Promise<number> {
    const total: number = await this.totalService.getTotal();
    const randomNumber: number = Math.floor(Math.random() * total) + 1;
    console.log(randomNumber);
    return randomNumber;
  }

  async getItem(): Promise<ItemModel | null> {
    const allItens: ItemModel[] = await this.databaseService.item.findMany();

    const luckyNumber: number = await this.getLuckyNumber();

    let sumProbability: number = 1;

    for (const item of allItens) {
      sumProbability += item.probability;
      console.log(item);
      console.log(luckyNumber <= sumProbability);
      if (luckyNumber <= sumProbability) {
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
    await this.totalService.updateTotal(rarityProbability);
    console.log('Item criado com sucesso!');
    await this.databaseService.item.create({
      data: {
        name: body.name,
        rarity: body.rarity,
        probability: rarityProbability,
      },
    });
  }
}
