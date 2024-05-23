import moment_timezone from 'moment-timezone';
import moment, { Moment } from 'moment';


export class MarketTime {
  static get currentNYTime(): Moment {
    return moment_timezone().tz('America/New_York');
  }

  static get openTime(): Moment {
    const now: Moment = MarketTime.currentNYTime;
    return moment(now).set('hour', 9).set('minute', 30).set('second', 0).set('millisecond', 0);
  }

  static get preOpenTime(): Moment {
    const now: Moment = MarketTime.currentNYTime;
    return moment(now).set('hour', 8).set('minute', 0).set('second', 0).set('millisecond', 0);
  }

  static get closeTime(): Moment {
    const now: Moment = MarketTime.currentNYTime;
    return moment(now).set('hour', 16).set('minute', 0).set('second', 0).set('millisecond', 0);
  }

  static get afterCloseTime(): Moment {
    const now: Moment = MarketTime.currentNYTime;
    return moment(now).set('hour', 20).set('minute', 0).set('second', 0).set('millisecond', 0);
  }

  static get afterEarlyCloseTime(): Moment {
    const now: Moment = MarketTime.currentNYTime;
    return moment(now).set('hour', 17).set('minute', 0).set('second', 0).set('millisecond', 0);
  }

  static get earlyCloseTime(): Moment {
    const now: Moment = MarketTime.currentNYTime;
    return moment(now).set('hour', 13).set('minute', 0).set('second', 0).set('millisecond', 0);
  }

  static earlyClosed(): boolean {
    const nyNow: Moment = MarketTime.currentNYTime;
    return MarketTime.earlyCloseTime <= nyNow || MarketTime.openTime > nyNow;
  }

  static coreOpen(): boolean {
    const nyNow: Moment = MarketTime.currentNYTime;
    return MarketTime.closeTime > nyNow && MarketTime.openTime <= nyNow;
  }

  static preMarket(): boolean {
    const nyNow: Moment = MarketTime.currentNYTime;
    return nyNow >= MarketTime.preOpenTime && nyNow < MarketTime.openTime;
  }

  static afterMarket(earlyCloseDay: boolean): boolean {
    const nyNow: Moment = MarketTime.currentNYTime;
    if (earlyCloseDay) return nyNow > MarketTime.earlyCloseTime && nyNow < MarketTime.afterEarlyCloseTime;
    return nyNow > MarketTime.closeTime && nyNow < MarketTime.afterCloseTime;
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
