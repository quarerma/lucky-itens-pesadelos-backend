import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { DataBaseService } from 'src/database/database.service';
import { TotalModule } from 'src/total/total.module';
import { TotalService } from 'src/total/total.service';

@Module({
  imports: [TotalModule],
  controllers: [ItemController],
  providers: [ItemService, DataBaseService, TotalService],
})
export class ItemModule {}
