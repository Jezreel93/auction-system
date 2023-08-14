// init-db.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { Auction } from './auction.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class InitDbService implements OnModuleInit {

  constructor(
    @InjectModel('Auction')
    private readonly auctionModel: Model<Auction>,
  ) {}

  async onModuleInit() {
    await this.initDatabase();
  }

  private async initDatabase() {
    try {
      const data = [
        {
          _id: '64d716d2a496865830e434a3',
          id: '64d716d2a496865830e434a3',
          highestBid: 0,
          status: 'open',
          bestBid: {
            id: 'd0c8de5d-2715-4fdd-b926-2f0c9756ff4e',
            bidderId: '0ct9vnymrlsr7rw72w3ez',
            auctionId: '64d716d2a496865830e434a3',
            connectionId: '3duQC2E8YxJiAPR5AAAD',
            amount: 0,
          }
        },
      ];

      const result = await this.auctionModel.insertMany(data);
      console.info('Documentos insertados:');
    } catch (error) {
      console.info('Datos ya cargados?:');
    }
  }
}
