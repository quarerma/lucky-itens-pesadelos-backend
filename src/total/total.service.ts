import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { TotalModel } from './total.model';

@Injectable()
export class TotalService {
  constructor(private dataBaseService: DataBaseService) {}

  async getTotal(): Promise<number> {
    const total: TotalModel = await this.dataBaseService.total.findFirst({
      where: {
        id: 1,
      },
    });

    return total.total;
  }

  async updateTotal(total: number): Promise<void> {
    const currentTotal: number = await this.getTotal();
    total += currentTotal;
    await this.dataBaseService.total.update({
      where: {
        id: 1,
      },
      data: {
        total,
      },
    });
  }
}
