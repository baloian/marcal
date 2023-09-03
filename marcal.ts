import { NYSEMarket, NYSEMarketTy } from './nyse';


export interface MarCalType {
  readonly nyse: NYSEMarketTy;
  isMarketOpen(): boolean;
  minutesToClose(): number;
}


export class MarCal implements MarCalType {
  readonly nyse: NYSEMarketTy = new NYSEMarket();

  isMarketOpen(): boolean {
    return this.nyse.isOpen();
  }

  minutesToClose(): number {
    return this.nyse.minutesToClose();
  }
}
