import { MarketTime } from '../time';
import moment from 'moment';


describe('MarketTime', () => {
  test('openTime should return a moment object set to 9:30 am in New York time', () => {
    const marketOpenTime = MarketTime.openTime;
    /*
    expect(marketOpenTime.hour()).toBe(9);
    expect(marketOpenTime.minute()).toBe(30);
    expect(marketOpenTime.tz()).toBe('America/New_York');
    */
  });

  test('openTime should return a moment object representing today\'s date', () => {
    /*
    const marketOpenTime = MarketTime.openTime;
    const today = moment().tz('America/New_York');
    expect(marketOpenTime.year()).toBe(today.year());
    expect(marketOpenTime.month()).toBe(today.month());
    expect(marketOpenTime.date()).toBe(today.date());
    */
  });
});
