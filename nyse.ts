import { MarketTime } from './market-time';
import { NYTimeNow, NYTimeNowTy } from './ny-time';

type CalendarTy = {[key: string]: {[key: string]: number[]}};

export interface NYSEMarket {
  readonly holidays: CalendarTy;
  readonly earlyCloseDays: CalendarTy;
  open(): boolean;
  preMarket(): boolean;
  afterMarket(): boolean;
  minutesToClose(): number;
  isHolidayOrWeekend(): boolean;
}

// All NYSE markets observe U.S. holidays as listed below for 2023, 2024, and 2025.
// Source: https://www.nyse.com/markets/hours-calendars
export class NYSEMarket implements NYSEMarket {
  readonly holidays: CalendarTy = {
    2025: {
      January: [1, 19],
      February: [16],
      April: [3],
      May: [25],
      June: [19],
      July: [13],
      September: [7],
      November: [27],
      December: [25]
    },
    2026: {
      January: [1, 19],
      February: [16],
      April: [3],
      May: [25],
      June: [19],
      September: [7],
      November: [26],
      December: [25]
    }
  };
  readonly earlyCloseDays: CalendarTy = {
    2025: {
      July: [3],
      November: [28],
      December: [24]
    },
    2026: {
      July: [3],
      December: [24]
    }
  };

  open(): boolean {
    const now: NYTimeNowTy = new NYTimeNow();
    if (!this.openDay(now)) return false;
    // On early close days each market will close early at 1:00 p.m
    if (this.isDateOnCalendar(this.earlyCloseDays, now) && MarketTime.earlyClosed()) return false;
    return MarketTime.coreOpen();
  }

  minutesToClose(): number {
    if (this.open()) {
      const now: NYTimeNowTy = new NYTimeNow();
      let close: Date = MarketTime.closeTime;
      if (this.isDateOnCalendar(this.earlyCloseDays, now)) close = MarketTime.earlyCloseTime;
      const diffMs = close.getTime() - now.time.getTime();
      return Math.floor(diffMs / (1000 * 60));
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
    const earlyCloseDay: boolean = this.isDateOnCalendar(this.earlyCloseDays, now);
    if (this.openDay(now) && MarketTime.afterMarket(earlyCloseDay)) return true;
    return false;
  }

  isHolidayOrWeekend(): boolean {
    const now: NYTimeNowTy = new NYTimeNow();
    return !this.openDay(now);
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
