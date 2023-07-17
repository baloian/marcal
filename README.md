# Financial Market Calendar

**MarCal** is a TypeScript library that provides market calendars and trading hours for trading applications.

### Supported markets
For now, **MarCal** only supports the New York Stock Exchange (NYSE) calendar for the years 2023 and 2024.


### Install
```bash
npm i marcal
```

### Usage
```typescript
import { MarCal, MarCalType } from 'marcal';

const marCal: MarCalType = new MarCal();

const is_nyse_open = marCal.isMarketOpen('nyse');
if (is_nyse_open) {
  console.log('NYSE is open')
} else {
  console.log('NYSE is closed')
}
```

### Methods
```typescript
// Method checks if the given market is open or closed.
//
// Arguments:
// -market: Market name. By default it is set to 'nyse'.
//
// Returns true if market open, otherwise false.
isMarketOpen(market)
```


### Contributions
Contributions are welcome and can be made by submitting GitHub pull requests
to this repository. In general, the `MarCal` source code follows
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and the
rules specified in `.eslintrc.json` file.


### License
This source code is available to everyone under the standard
[MIT LICENSE](https://github.com/baloian/marcal/blob/master/LICENSE).
