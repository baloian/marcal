import moment_timezone from 'moment-timezone';
import moment from 'moment';
import { nyseHolidays } from './markets/nyse';


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
export function hasKey(object: object, key: string): boolean {
  const has = Object.prototype.hasOwnProperty;
  return has.call(object, key);
}


// The New York Stock Exchange is open between 9:30am - 4:00pm from Monday
// to Friday in New York time, inless it is not a holiday day.
export function isNYSEOpen(): boolean {
  const nyTime = moment_timezone().tz('America/New_York');
  const weekDay: number = nyTime.day();
  if (weekDay === 0 || weekDay === 6) return false;
  if (isHoliday(nyTime)) return false;

  const openTime = moment(nyTime).set('hour', 9).set('minute', 30).set('second', 0);
  const closeTime = moment(nyTime).set('hour', 16).set('minute', 0).set('second', 0);
  if (nyTime >= openTime && nyTime < closeTime) return true;
  return false;
}


export function isHoliday(currentTime: any, market: string = 'nyse'): boolean {
  let holidayDic = {};
  switch (market) {
    case 'nyse':
      holidayDic = nyseHolidays;
      break;
    default:
      holidayDic = {};
  }

  const currentYear: string = String(currentTime.year());
  if (hasKey(holidayDic, currentYear)) {
    const currentMonth: string = currentTime.format('MMMM');
    if (hasKey(holidayDic[currentYear], currentMonth)) {
      const monthDays: number[] = holidayDic[currentYear][currentMonth];
      const currentDay: number = Number(currentTime.format('DD'));
      const found = monthDays.find((element: number) => element === currentDay);
      if (found !== undefined) return true
    }
  } else {
    throw `${currentYear} year is not supported`;
  }
  return false
}
