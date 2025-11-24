export class MarketTime {
  static get currentNYTime(): Date {
    const date = new Date();
    return new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  }

  private static setTimeFromNow(hour: number, minute: number): Date {
    const now: Date = this.currentNYTime;
    const date = new Date(now);
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  static get openTime(): Date {
    return this.setTimeFromNow(9, 30);
  }

  static get preOpenTime(): Date {
    return this.setTimeFromNow(4, 0);
  }

  static get closeTime(): Date {
    return this.setTimeFromNow(16, 0);
  }

  static get afterCloseTime(): Date {
    return this.setTimeFromNow(20, 0);
  }

  static get afterEarlyCloseTime(): Date {
    return this.setTimeFromNow(17, 0);
  }

  static get earlyCloseTime(): Date {
    return this.setTimeFromNow(13, 0);
  }

  static earlyClosed(): boolean {
    const nyNow: Date = this.currentNYTime;
    return (
      this.earlyCloseTime.getTime() <= nyNow.getTime() || this.openTime.getTime() > nyNow.getTime()
    );
  }

  static coreOpen(): boolean {
    const nyNow: Date = this.currentNYTime;
    return this.closeTime.getTime() > nyNow.getTime() && this.openTime.getTime() <= nyNow.getTime();
  }

  static preMarket(): boolean {
    const nyNow: Date = this.currentNYTime;
    return nyNow.getTime() >= this.preOpenTime.getTime() && nyNow.getTime() < this.openTime.getTime();
  }

  static afterMarket(earlyCloseDay: boolean): boolean {
    const nyNow: Date = this.currentNYTime;
    if (earlyCloseDay) {
      return (
        nyNow.getTime() > this.earlyCloseTime.getTime() &&
        nyNow.getTime() < this.afterEarlyCloseTime.getTime()
      );
    }
    return (
      nyNow.getTime() > this.closeTime.getTime() && nyNow.getTime() < this.afterCloseTime.getTime()
    );
  }
}
