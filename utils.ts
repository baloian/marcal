import moment_timezone from 'moment-timezone';
import moment from 'moment';
import { nyse_holidays } from './markets/nyse';


// Function checks if given object has a provided key/property or not.
//
// See ESLint rules for details:
// https://eslint.org/docs/rules/no-prototype-builtins
//
// Arguments:
// - object: JSON object.
// - key: Provide key, which will be checked.
//
// Returns true if an object has 'key' property, otherwise false.
export function hasKey(object: object, key: string) {
  const has = Object.prototype.hasOwnProperty;
  return has.call(object, key);
}


// The New York Stock Exchange is open between 9:30am - 4:00pm from Monday
// to Friday in New York time, inless it is not a holiday day.
export function isNYSEOpen() {
  const ny_time = moment_timezone().tz('America/New_York');
  const week_day = ny_time.day();
  if (week_day === 0 || week_day === 6) return false;

  if (isHoliday(ny_time)) return false;

  const open_time = moment(ny_time).set('hour', 9).set('minute', 30).set('second', 0);
  const close_time = moment(ny_time).set('hour', 16).set('minute', 0).set('second', 0);

  if (ny_time >= open_time && ny_time < close_time) return true;

  return false;
}


export function isHoliday(current_time: any, market: string = 'nyse') {
  let holiday_dic = {};
  switch (market) {
    case 'nyse':
      holiday_dic = nyse_holidays;
      break;
    default:
      holiday_dic = {};
  }

  const current_year = String(current_time.year());
  if (hasKey(holiday_dic, current_year)) {
    const current_month = current_time.format('MMMM');
    if (hasKey(holiday_dic[current_year], current_month)) {
      const month_days = holiday_dic[current_year][current_month];
      const current_day = Number(current_time.format('DD'));
      const found = month_days.find((element: number) => element === current_day);
      if (found !== undefined) return true
    }
  } else {
    throw `${current_year} year is not supported`;
  }

  return false
}
