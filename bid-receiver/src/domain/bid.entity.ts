import { IBid } from './bid.interface';

export class Bid {
  readonly id: string;
  readonly bidderId: string;
  readonly auctionId: string;
  readonly connectionId: string;
  amount: number;

  constructor(bid: IBid) {
    this.id = bid.id;
    this.bidderId = bid.bidderId;
    this.auctionId = bid.auctionId;
    this.connectionId = bid.connectionId;
    this.setAmount(bid.amount);
  }

  public getId(): string {
    return this.id;
  }

  public getBidderId(): string {
    return this.bidderId;
  }

  public getAuctionId(): string {
    return this.auctionId;
  }

  public getAmount(): number {
    return this.amount;
  }

  private setAmount(amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    this.amount = amount;
  }
}
