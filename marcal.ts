import { NYSEMarket } from './nyse';


export interface MarCal {
  readonly nyse: NYSEMarket;
  marketOpen(): boolean;
  preMarket(): boolean;
  afterMarket(): boolean;
  minutesToClose(): number;
  isHolidayOrWeekend(): boolean;
}


export class MarCal implements MarCal {
  readonly nyse: NYSEMarket = new NYSEMarket();

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

  isHolidayOrWeekend(): boolean {
    return this.nyse.isHolidayOrWeekend();
  }
}
