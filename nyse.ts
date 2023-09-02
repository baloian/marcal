import { MarketTime, NYTimeNow } from './time';


type CalendarTy = {[key: string]: {[key: string]: number[]}};
export interface NYSEMarketTy {
  readonly holidays: CalendarTy;
  readonly earlyCloseDays: CalendarTy;
  isOpen(): boolean;
}


// All NYSE markets observe U.S. holidays as listed below for 2023, 2024, and 2025.
// Source: https://www.nyse.com/markets/hours-calendars
export class NYSEMarket implements NYSEMarketTy {
  readonly holidays: CalendarTy = {
    2023: {
      January: [16],
      February: [20],
      April: [7],
      May: [29],
      June: [19],
      July: [4],
      September: [4],
      November: [23],
      December: [25]
    },
    2024: {
      January: [1, 15],
      February: [19],
      March: [29],
      May: [27],
      June: [19],
      July: [4],
      September: [2],
      November: [28],
      December: [25]
    },
    2025: {
      January: [1, 20],
      February: [17],
      April: [18],
      May: [26],
      June: [19],
      July: [4],
      September: [1],
      November: [27],
      December: [25]
    }
  };
  readonly earlyCloseDays: CalendarTy = {
    2023: {
      July: [3],
      November: [24]
    },
    2024: {
      July: [3],
      November: [29],
      December: [24]
    },
    2025: {
      July: [3],
      November: [28],
      December: [24]
    }
  };

  isOpen(): boolean {
    const now = new NYTimeNow();
    if (now.weekDay === 0 || now.weekDay === 6) return false;

    // On early close days each market will close early at 1:00 p.m
    if (this.isDateOnCalendar(this.earlyCloseDays, now.year, now.month, now.day) && MarketTime.earlyClosed) return false;
    if (this.isDateOnCalendar(this.holidays, now.year, now.month, now.day)) return false;
    return MarketTime.coreOpen;
  }

  private isDateOnCalendar(data: CalendarTy, year: string, month: string, day: number): boolean {
    if (data[year] && data[year][month]) {
      const found: number | undefined = data[year][month].find((e: number) => e === day);
      if (found) return true;
    }
    return false;
  }
}
