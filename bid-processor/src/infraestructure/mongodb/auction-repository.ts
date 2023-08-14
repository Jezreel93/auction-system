import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auction } from './auction.entity';
import { IAuction } from 'src/domain/auction/auction.interface';
import { IAuctionRepository } from 'src/application/ports/out/auction-repository';

export class AuctionRepository implements IAuctionRepository {
  constructor(
    @InjectModel('Auction')
    private readonly auctionModel: Model<Auction>,
  ) {}

  public async getById(id: string): Promise<IAuction> {
    const auction = await this.auctionModel.findOne({ id: id });

    if (!auction) {
      throw new Error('Auction not found for the provided ID');
    }

    return auction;
  }

  public async update(auctionToUpdate: IAuction): Promise<IAuction> {
    const updateResult = await this.auctionModel.updateOne(
      { _id: auctionToUpdate.id },
      { $set: auctionToUpdate },
    );

    if (updateResult.modifiedCount === 0) {
      throw new Error('Failed to update the auction');
    }

    return auctionToUpdate;
  }
}
