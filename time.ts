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

  static get closeTime(): Moment {
    const now: Moment = MarketTime.currentNYTime;
    return moment(now).set('hour', 16).set('minute', 0).set('second', 0).set('millisecond', 0);
  }

  static get earlyCloseTime(): Moment {
    const now: Moment = MarketTime.currentNYTime;
    return moment(now).set('hour', 13).set('minute', 0).set('second', 0).set('millisecond', 0);
  }

  static get earlyClosed(): boolean {
    const nyNow: Moment = MarketTime.currentNYTime;
    return MarketTime.openTime > nyNow || MarketTime.earlyCloseTime <= nyNow;
  }

  static get coreOpen(): boolean {
    const nyNow: Moment = MarketTime.currentNYTime;
    return MarketTime.openTime <= nyNow && MarketTime.closeTime > nyNow;
  }
}


export class NYTimeNow {
  now: Moment = MarketTime.currentNYTime;

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