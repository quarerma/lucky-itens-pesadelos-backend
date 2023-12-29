import { Module } from '@nestjs/common';
import { TotalService } from './total.service';
import { DataBaseService } from 'src/database/database.service';

@Module({})
export class TotalModule {
  providers: [TotalService, DataBaseService];
}
