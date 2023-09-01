import { NYSEMarket, NYSEMarketTy } from './markets/nyse';


export interface MarCalType {
  readonly nyse: NYSEMarketTy;
  isMarketOpen(): boolean;
}


export class MarCal implements MarCalType {
  readonly nyse: NYSEMarketTy = new NYSEMarket();
  // Method checks if the given market is open or closed.
  //
  // Arguments:
  // -market: Market name.
  //
  // Returns true if market open, otherwise false.
  isMarketOpen(): boolean {
    // TODO: Provide functionality for other markets as well.
    return this.nyse.isOpen();
  }
}
