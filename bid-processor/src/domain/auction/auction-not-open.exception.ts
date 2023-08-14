export class AuctionNotOpenException extends Error {
  constructor() {
    super('Auction is not open');
    this.name = 'AuctionNotOpenException';
    Object.setPrototypeOf(this, AuctionNotOpenException.prototype);
  }
}
