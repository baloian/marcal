import { NYSEMarket, NYSEMarketTy } from './nyse';


export interface MarCalType {
  readonly nyse: NYSEMarketTy;
  isMarketOpen(): boolean;
}


export class MarCal implements MarCalType {
  readonly nyse: NYSEMarketTy = new NYSEMarket();

  isMarketOpen(): boolean {
    // TODO: Provide functionality for other markets as well.
    return this.nyse.isOpen();
  }
}
