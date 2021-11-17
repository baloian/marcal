import moment_timezone from 'moment-timezone';
import moment from 'moment';
import { isHoliday, isNYSEOpen } from './utils';


export interface MarCalType {
  isMarketOpen(market: string): boolean;
  isHolidayOrWeekend(market: string): boolean;
  isEarlyTradingSession(market: string): boolean;
  isLateTradingSession(market: string): boolean;
  isCoreTradingSession(market: string): boolean;
  isTimeInCoreThreadinInterval(now: any): boolean
}


export class MarCal implements MarCalType {
  // Method checks if the given market is open or closed.
  //
  // Arguments:
  // -market: Market name.
  //
  // Returns true if market open, otherwise false.
  isMarketOpen(market: string): boolean {
    let result: boolean = false;
    switch (market.toLowerCase()) {
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
  // -market: Market name.
  //
  // Returns true if market is closed (holiday or weekend), otherwise false.
  isHolidayOrWeekend(market: string): boolean {
    let time: any = false;
    switch (market.toLowerCase()) {
      case 'nyse':
        time = moment_timezone().tz('America/New_York');
        break;
      default:
        time = false;
    }

    if (!time) return false;

    const weekDay: number = time.day();
    if (weekDay === 0 || weekDay === 6) return true;
    return isHoliday(time, market);
  }


  // Method checks if for the given market it is early trading session or not.
  //
  // TODO: Currently, the method supports only NYSE.
  //
  // Arguments:
  // -market: Market name.
  //
  // Returns true if the given market is on early trading session, otherwise false.
  isEarlyTradingSession(market: string): boolean {
    if (this.isHolidayOrWeekend(market)) return false;

    // NYSE early trading session: 7:00 a.m. to 9:30 a.m. ET
    const nyTime = moment_timezone().tz('America/New_York');
    const openTime = moment(nyTime).set('hour', 7).set('minute', 0).set('second', 0);
    const closeTime = moment(nyTime).set('hour', 9).set('minute', 30).set('second', 0);

    if (nyTime >= openTime && nyTime < closeTime) return true;
    return false;
  }


  // Method checks if for the given market it is late trading session or not.
  //
  // TODO: Currently, the method supports only NYSE.
  //
  // Arguments:
  // -market: Market name.
  //
  // Returns true if the given market is on late trading session, otherwise false.
  isLateTradingSession(market: string): boolean {
    if (this.isHolidayOrWeekend(market)) return false;

    // NYSE late trading session: 4:00 p.m. to 8:00 p.m. ET
    const nyTime = moment_timezone().tz('America/New_York');
    const openTime = moment(nyTime).set('hour', 16).set('minute', 0).set('second', 0);
    const closeTime = moment(nyTime).set('hour', 20).set('minute', 0).set('second', 0);

    if (nyTime >= openTime && nyTime < closeTime) return true;
    return false;
  }


  // Method checks if for the given market it is core trading session or not.
  //
  // TODO: Currently, the method supports only NYSE.
  //
  // Arguments:
  // -market: Market name.
  //
  // Returns true if the given market is on core trading session, otherwise false.
  isCoreTradingSession(market: string): boolean {
    if (this.isHolidayOrWeekend(market)) return false;

    // NYSE late trading session: 9:30 a.m. to 4:00 p.m. ET
    const nyTime = moment_timezone().tz('America/New_York');
    const openTime = moment(nyTime).set('hour', 9).set('minute', 30).set('second', 0);
    const closeTime = moment(nyTime).set('hour', 16).set('minute', 0).set('second', 0);

    if (nyTime >= openTime && nyTime < closeTime) return true;
    return false;
  }


  isTimeInCoreThreadinInterval(now: any): boolean {
    const currTime = moment(now).tz('America/New_York');
    const nyTime = moment_timezone().tz('America/New_York');
    const openTime = moment(nyTime).set('hour', 9).set('minute', 30).set('second', 0);
    const closeTime = moment(nyTime).set('hour', 16).set('minute', 0).set('second', 0);
    if (currTime >= openTime && currTime < closeTime) return true;
    return false;
  }
}
