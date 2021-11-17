import { MarCal, MarCalType } from './marcal';

const marCal: MarCalType = new MarCal();

const is_nyse_open = marCal.isMarketOpen('nyse');
if (is_nyse_open) {
  console.log('NYSE is open')
} else {
  console.log('NYSE is closed')
}

const is_holiday = marCal.isHolidayOrWeekend('nyse');
if (is_holiday) {
  console.log('Today is holiday or weekend');
}
