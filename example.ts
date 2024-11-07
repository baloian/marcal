import { MarCal, MarCalType } from './marcal';

const marCal: MarCalType = new MarCal();

const isMarketOpen: boolean = marCal.marketOpen();
const minutesUntilClose: number = marCal.minutesToClose();

if (isMarketOpen) {
  console.log(`US market is open with ${minutesUntilClose} minutes until close`);
} else {
  if (marCal.preMarket()) {
    console.log('US market is in pre-market trading hours (4:00 AM - 9:30 AM ET)');
  } else if (marCal.afterMarket()) {
    console.log('US market is in after-hours trading (4:00 PM - 8:00 PM ET)');
  } else {
    console.log('US market is closed');
  }
}
