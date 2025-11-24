import { MarketTime } from './market-time';

export interface NYTimeNowTy {
  readonly now: Date;
  get time(): Date;
  get weekDay(): number;
  get year(): string;
  get month(): string;
  get day(): number;
}

export class NYTimeNow implements NYTimeNowTy {
  readonly now: Date = MarketTime.currentNYTime;

  get time(): Date {
    return this.now;
  }

  get weekDay(): number {
    return this.now.getDay();
  }

  get year(): string {
    return String(this.now.getFullYear());
  }

  get month(): string {
    return this.now.toLocaleString('default', { month: 'long' });
  }

  get day(): number {
    return this.now.getDate();
  }
}
