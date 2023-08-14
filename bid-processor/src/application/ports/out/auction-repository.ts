import { Repository } from 'src/application/interfaces/repository';
import { IAuction } from 'src/domain/auction/auction.interface';

export type IAuctionRepository = Repository<IAuction>;

export const AUCTION_REPOSITORY = 'AUCTION_REPOSITORY';