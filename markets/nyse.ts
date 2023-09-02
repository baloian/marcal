import moment_timezone from 'moment-timezone';
import moment, { Moment } from 'moment';


function getCurrentNYTime(): Moment {
  return moment_timezone().tz('America/New_York');
}


type CalendarTy = {[key: string]: {[key: string]: number[]}};
export interface NYSEMarketTy {
  holidays: CalendarTy;
  earlyCloseDays: CalendarTy;
  isOpen(): boolean;
}


// All NYSE markets observe U.S. holidays as listed below for 2023, 2024, and 2025.
// Source: https://www.nyse.com/markets/hours-calendars
export class NYSEMarket implements NYSEMarketTy {
  holidays: CalendarTy = {
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
  earlyCloseDays: CalendarTy = {
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
    const currenDate: Moment = getCurrentNYTime();
    const weekDay: number = currenDate.day();
    if (weekDay === 0 || weekDay === 6) return false;

    const year: string = String(currenDate.year());
    const month: string = currenDate.format('MMMM');
    const day: number = Number(currenDate.format('DD'));

    if (this.isOnCalendar(this.holidays, year, month, day)) return false;
    if (this.isEarlyClose(year, month, day)) return false;
    return this.isCoreThreadingSession();
  }

  private isEarlyClose(year: string, month: string, day: number): boolean {
    if (this.isOnCalendar(this.earlyCloseDays, year, month, day)) {
      // Each market will close early at 1:00 p.m
      const closeTime: Moment = moment(getCurrentNYTime()).set('hour', 13).set('minute', 0).set('second', 0).set('millisecond', 0);
      const currentNYTime: Moment = getCurrentNYTime();
      if (currentNYTime >= closeTime) return true;
    }
    return false;
  }

  private isOnCalendar(data: CalendarTy, year: string, month: string, day: number): boolean {
    if (data[year] && data[year][month]) {
      const found: number | undefined = data[year][month].find((e: number) => e === day);
      if (found) return true;
    }
    return false;
  }

  private isCoreThreadingSession(): boolean {
    const now: Moment = getCurrentNYTime();
    const openTime: Moment = moment(now).set('hour', 9).set('minute', 30).set('second', 0).set('millisecond', 0);
    const closeTime: Moment = moment(now).set('hour', 16).set('minute', 0).set('second', 0).set('millisecond', 0);
    const currentNYTime: Moment = getCurrentNYTime();
    if (currentNYTime >= openTime && currentNYTime < closeTime) return true;
    return false;
  }
}
