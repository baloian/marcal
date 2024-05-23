import { NYSEMarket, NYSEMarketTy } from './nyse';


export interface MarCalType {
  readonly nyse: NYSEMarketTy;
  marketOpen(): boolean;
  preMarket(): boolean;
  afterMarket(): boolean;
  minutesToClose(): number;
}


export class MarCal implements MarCalType {
  readonly nyse: NYSEMarketTy = new NYSEMarket();

  marketOpen(): boolean {
    return this.nyse.open();
  }

  preMarket(): boolean {
    return this.nyse.preMarket();
  }

  afterMarket(): boolean {
    return this.nyse.afterMarket();
  }

  minutesToClose(): number {
    return this.nyse.minutesToClose();
  }
}
