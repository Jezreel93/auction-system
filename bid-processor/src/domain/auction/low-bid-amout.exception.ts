export class LowBidAmountException extends Error {
  constructor() {
    super('Enter Bid is not higher than current highest bid');
    this.name = 'LowBidAmountException';
    Object.setPrototypeOf(this, LowBidAmountException.prototype);
  }
}
