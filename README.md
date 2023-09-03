# Stock Market Calendar
**MarCal** is a TypeScript library that provides a stock market calendar for stock trading applications.
For now, it provides the calendar for the years `2023`, `2024` and `2025`.

Note that all the U.S. stock exchanges open at the same time. The three major stock exchanges NYSE, NASDAQ,
and the American Stock Exchange synchronize opening times.


## Install
```bash
npm i marcal
```

## Usage
```typescript
import { MarCal, MarCalType } from 'marcal';

const marCal: MarCalType = new MarCal();

const open: boolean = marCal.isMarketOpen();
if (open) {
  console.log('US market is open')
} else {
  console.log('US market is closed')
}
```

## Methods
```typescript
// Returns true if US market is open. Otherwise, false.
isMarketOpen(): boolean

// Returns the number of remaining minutes before the market closes.
minutesToClose(): number
```

## Contributions
Contributions are welcome and can be made by submitting GitHub pull requests
to this repository. In general, the `MarCal` source code follows
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and the
rules specified in `.eslintrc.json` file.


## License
This source code is available to everyone under the standard
[MIT LICENSE](https://github.com/baloian/marcal/blob/master/LICENSE).
