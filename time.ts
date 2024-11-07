import moment_timezone from 'moment-timezone';
import moment, { Moment } from 'moment';


export class MarketTime {
  static get currentNYTime(): Moment {
    return moment_timezone().tz('America/New_York');
  }

  private static setTimeFromNow(hour: number, minute: number): Moment {
    const now: Moment = this.currentNYTime;
    return moment(now)
      .set('hour', hour)
      .set('minute', minute)
      .set('second', 0)
      .set('millisecond', 0);
  }

  static get openTime(): Moment {
    return this.setTimeFromNow(9, 30);
  }

  static get preOpenTime(): Moment {
    return this.setTimeFromNow(4, 0);
  }

  static get closeTime(): Moment {
    return this.setTimeFromNow(16, 0);
  }

  static get afterCloseTime(): Moment {
    return this.setTimeFromNow(20, 0);
  }

  static get afterEarlyCloseTime(): Moment {
    return this.setTimeFromNow(17, 0);
  }

  static get earlyCloseTime(): Moment {
    return this.setTimeFromNow(13, 0);
  }

  static earlyClosed(): boolean {
    const nyNow: Moment = this.currentNYTime;
    return this.earlyCloseTime <= nyNow || this.openTime > nyNow;
  }

  static coreOpen(): boolean {
    const nyNow: Moment = this.currentNYTime;
    return this.closeTime > nyNow && this.openTime <= nyNow;
  }

  static preMarket(): boolean {
    const nyNow: Moment = this.currentNYTime;
    return nyNow >= this.preOpenTime && nyNow < this.openTime;
  }

  static afterMarket(earlyCloseDay: boolean): boolean {
    const nyNow: Moment = this.currentNYTime;
    if (earlyCloseDay) {
      return nyNow > this.earlyCloseTime && nyNow < this.afterEarlyCloseTime;
    }
    return nyNow > this.closeTime && nyNow < this.afterCloseTime;
  }
}


export interface NYTimeNowTy {
  readonly now: Moment;
  get time(): Moment;
  get weekDay(): number;
  get year(): string;
  get month(): string;
  get day(): number;
}

export class NYTimeNow implements NYTimeNowTy {
  readonly now: Moment = MarketTime.currentNYTime;

  get time(): Moment {
    return this.now;
  }

  get weekDay(): number {
    return this.now.day();
  }

  get year(): string {
    return String(this.now.year());
  }

  get month(): string {
    return this.now.format('MMMM');
  }

  get day(): number {
    return Number(this.now.format('DD'));
  }
}
