# Stock Market Calendar

[![NPM](https://img.shields.io/npm/v/marcal.svg)](https://www.npmjs.com/package/marcal)

**MarCal** is a TypeScript library that provides a stock market calendar for stock trading applications.
For now, it provides the calendar for the years `2023`, `2024` and `2025`.

Note that all major U.S. stock exchanges (NYSE, NASDAQ, and AMEX) operate on synchronized trading hours:
- Regular Market Hours: 9:30 AM - 4:00 PM ET
- Pre-Market Trading: 4:00 AM - 9:30 AM ET  
- After-Hours Trading: 4:00 PM - 8:00 PM ET


## Install
```bash
npm install marcal
```

## Usage
```typescript
import { MarCal, MarCalType } from 'marcal';

const marCal: MarCalType = new MarCal();

const isMarketOpen: boolean = marCal.marketOpen();

if (isMarketOpen) {
  console.log('US market is open');
} else {
  console.log('US market is closed');
}
```

## Methods
```typescript
/**
 * Checks if the US stock market is currently open during regular trading hours (9:30 AM - 4:00 PM ET).
 * @returns {boolean} True if market is open, false otherwise
 */
marketOpen(): boolean

/**
 * Checks if the US stock market is in pre-market trading hours (4:00 AM - 9:30 AM ET).
 * @returns {boolean} True if in pre-market session, false otherwise
 */
preMarket(): boolean

/**
 * Checks if the US stock market is in after-hours trading session (4:00 PM - 8:00 PM ET).
 * @returns {boolean} True if in after-hours session, false otherwise
 */
afterMarket(): boolean

/**
 * Calculates remaining time until market close (4:00 PM ET).
 * @returns {number} Number of minutes until market closes. Returns 0 if market is already closed.
 */
minutesToClose(): number
```

## Contributions
We welcome contributions to MarCal! To contribute, please:

1. `git clone` the repository
2. Create a new branch for your feature/fix
3. Make your changes following our coding standards
4. Submit a pull request

The codebase adheres to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) 
and follows the linting rules defined in `.eslintrc.json`. Please ensure your code matches
these standards before submitting.


## License
This source code is available to everyone under the standard
[MIT LICENSE](https://github.com/baloian/marcal/blob/master/LICENSE).
