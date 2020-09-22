import { isNYSEOpen } from './utils';


class MarCal {
  constructor() {}

  // Method checks if the given market is open or closed.
  //
  // Arguments:
  // -market: Market name. By default it is set to 'nyse'.
  //
  // Returns true if market open, otherwise false.
  isMarketOpen(market: string = 'nyse') {
    let result = false;
    market = market.toLowerCase();
    switch (market) {
      case 'nyse':
        result = isNYSEOpen();
        break;
      default:
        result = false;
    }

    return result;
  }
}

export default MarCal;
