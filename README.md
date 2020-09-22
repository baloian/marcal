# Financial Market Calendar

**MarCal** is a `TypeScript` library which provides market calendar and
trading hours for trading applications.


### Supported markets
For now, **MarCal** supports only New York Stock Exchange (NYSE) calendar from 2020 to 2023.


### How to Install?
```
npm i marcal
```

### How to Use?
```javascript
import MarCal from 'marcal';

const mar_cal = new MarCal();

const is_nyse_open = mar_cal.isMarketOpen();
if (is_nyse_open) {
  console.log('NYSE is open')
} else {
  console.log('NYSE is closed')
}
```

### MarCal Public Methods
```javascript
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

