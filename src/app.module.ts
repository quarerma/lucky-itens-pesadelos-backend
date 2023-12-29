import { Module } from '@nestjs/common';
import { DataBaseService } from './database/database.service';
import { ItemModule } from './item/item.module';
import { TotalModule } from './total/total.module';

@Module({
  imports: [ItemModule, TotalModule],
  controllers: [],
  providers: [DataBaseService],
})
export class AppModule {}
