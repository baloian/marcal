import { MarCal, MarCalType } from './marcal';

const marCal: MarCalType = new MarCal();

const open: boolean = marCal.marketOpen();
if (open) {
  console.log('US market is open')
} else {
  console.log('US market is closed')
}
