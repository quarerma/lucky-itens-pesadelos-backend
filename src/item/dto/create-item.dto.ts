import { Rarity } from '@prisma/client';

export class CreateItemDto {
  name: string;
  rarity: Rarity;
  probability: number;
}
