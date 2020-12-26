import moment_timezone from 'moment-timezone';
import { isHoliday, isNYSEOpen } from './utils';


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

  // Method checks if for the given market it is holiday or weekend.
  //
  // TODO: Currently, the method supports only NYSE.
  //
  // Arguments:
  // -market: Market name. By default it is set to 'nyse'.
  //
  // Returns true if market is closed (holiday or weekend), otherwise false.
  isHolidayOrWeekend(market: string = 'nyse') {
    let time: any = false;
    switch (market) {
      case 'nyse':
        time = moment_timezone().tz('America/New_York');
        break;
      default:
        time = false;
    }

    if (!time) return false;

    const week_day = time.day();
    if (week_day === 0 || week_day === 6) return true;
    return isHoliday(time, market);
  }
}

export default MarCal;
