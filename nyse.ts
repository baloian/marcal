import { Moment } from 'moment';
import { MarketTime, NYTimeNow, NYTimeNowTy } from './time';


type CalendarTy = {[key: string]: {[key: string]: number[]}};

export interface NYSEMarketTy {
  readonly holidays: CalendarTy;
  readonly earlyCloseDays: CalendarTy;
  open(): boolean;
  preMarket(): boolean;
  afterMarket(): boolean;
  minutesToClose(): number;
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

  open(): boolean {
    const now: NYTimeNowTy = new NYTimeNow();
    if (!this.openDay(now)) return false;
    // On early close days each market will close early at 1:00 p.m
    if (MarketTime.earlyClosed()) return false;
    return MarketTime.coreOpen();
  }

  minutesToClose(): number {
    if (this.open()) {
      const now: NYTimeNowTy = new NYTimeNow();
      let close: Moment = MarketTime.closeTime;
      if (this.isDateOnCalendar(this.earlyCloseDays, now)) close = MarketTime.earlyCloseTime;
      return close.diff(now.time, 'minutes');
    }
    return 0;
  }

  preMarket(): boolean {
    const now: NYTimeNowTy = new NYTimeNow();
    if (this.openDay(now) && MarketTime.preMarket()) return true;
    return false;
  }

  afterMarket(): boolean {
    const now: NYTimeNowTy = new NYTimeNow();
    if (this.openDay(now) && MarketTime.afterMarket()) return true;
    return false;
  }

  private isDateOnCalendar(data: CalendarTy, now: NYTimeNowTy): boolean {
    if (data[now.year] && data[now.year][now.month]) {
      const found: number | undefined = data[now.year][now.month].find((e: number) => e === now.day);
      if (found) return true;
    }
    return false;
  }

  private openDay(now: NYTimeNowTy): boolean {
    if (now.weekDay === 0 || now.weekDay === 6) return false;
    if (this.isDateOnCalendar(this.holidays, now)) return false;
    return true;
  }
}
