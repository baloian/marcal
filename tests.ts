import { MarCal, MarCalType } from './marcal';

const marCal: MarCalType = new MarCal();

const is_nyse_open = marCal.marketOpen();
if (is_nyse_open) {
  console.log('NYSE is open')
} else {
  console.log('NYSE is closed')
}
