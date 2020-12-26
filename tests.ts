import MarCal from './marcal';

const mar_cal = new MarCal();

const is_nyse_open = mar_cal.isMarketOpen('nyse');
if (is_nyse_open) {
  console.log('NYSE is open')
} else {
  console.log('NYSE is closed')
}

const is_holiday = mar_cal.isHolidayOrWeekend();
if (is_holiday) {
  console.log('Today is holiday or weekend');
}
