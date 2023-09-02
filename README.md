# Financial Market Calendar
**MarCal** is a TypeScript library that provides market calendar for stock trading applications.  
For now, **MarCal** only supports the New York Stock Exchange (NYSE) calendar for the years 2023, 2024 and 2025.


## Install
```bash
npm i marcal
```

## Usage
```typescript
import { MarCal, MarCalType } from 'marcal';

const marCal: MarCalType = new MarCal();

const isNYSEOpen = marCal.isMarketOpen();
if (isNYSEOpen) {
  console.log('NYSE is open')
} else {
  console.log('NYSE is closed')
}
```

## Contributions
Contributions are welcome and can be made by submitting GitHub pull requests
to this repository. In general, the `MarCal` source code follows
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and the
rules specified in `.eslintrc.json` file.


## License
This source code is available to everyone under the standard
[MIT LICENSE](https://github.com/baloian/marcal/blob/master/LICENSE).
