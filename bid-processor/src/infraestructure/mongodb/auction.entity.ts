import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuctionStatus } from 'src/domain/auction/auction.entity';
import { IBid } from 'src/domain/bid/bid.interface';

@Schema()
export class Auction extends Document {

  @Prop({
    unique: true,
    index: true,
  })
  id: string;

  @Prop()
  productId: number;

  @Prop()
  highestBid: number;

  @Prop()
  status: AuctionStatus;

  @Prop({
    type: Object,
    default: null,
  })
  bestBid: IBid;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
