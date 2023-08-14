import { IBid } from 'src/domain';

export interface ICreateBidPort {
  createBid(input: IBid): Promise<string>;
}

export const CREATE_BID_PORT = 'CREATE_BID_PORT';
