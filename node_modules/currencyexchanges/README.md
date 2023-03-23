# 💰 A simple exchange rate API for Node.js
[![GitHub package.json version](https://img.shields.io/github/package-json/v/Dannnington/node-exchangerate?style=for-the-badge)](https://github.com/Dannnington/node-exchangerate)
[![NPM package version](https://img.shields.io/npm/v/currencyexchanges?style=for-the-badge)](https://www.npmjs.com/package/currencyexchanges)

node-exchangerate is a JavaScript wrapper providing daily Forex currency exchange data, via [arzzen](https://github.com/arzzen/)'s [exchangerate.host](https://exchangerate.host). It is compatible with Node.js, the browser, and React Native.

# ➕ Install

**Node (yarn and npm)**
```bash
# Yarn
> yarn add currencyexchanges

# NPM
> npm i currencyexchanges
```

**Browser**
```html
<!-- browser and minified browser files are in dist/, download or use a Git file mirror to the raw file -->
<!-- you can also use an npm cdn pointing to dist/currencyexchanges-browser-min.js with 1.1.0+ -->
<script src="/path/to/currencyexchanges-browser.js"></script>
```

# 💽 Usage

**Node**
```js
const NodeExr = require("currencyexchanges");
const ExchangeRate = new NodeExr({ primaryCurrency: "GBP" });

(async function () {
    await ExchangeRate.getExchangeRate("AUD", "GBP").then(console.log);
})();
```

**Browser**
```html
<script src="/path/to/currencyexchanges-browser.js"></script>
<script>
    const ExchangeRates = new NodeExr({ primaryCurrency: "GBP" });
    ExchangeRates.getExchangeRate("EUR").then(result => console.log(result));
</script>
```

# ✔️ Features

- 💰 Daily exchange rates for both single and multiple currencies
- ⏰ Historical exchange rates between two time periods
- 📈 Daily fluctuation data exchange rates (start and end rates, percentages for change, etc.)

# 📚 Documentation

- The [index.js](src/index.js) file is extremely simple and the comments will help you understand what each function does
  
- When developing with node-exchangerate in supported IDEs, the comments from the index.js file are interpreted by JSDoc to generate notes and documentation regarding functions and their parameters
  
- The [example file](src/examples/example.js) demonstrates each function with an explanation, an example usage of the function, and its' output (in the comments) of the file.

# To-do

- [x] Fluctuations

- [x] Basic TypeScript configuration

- [ ] Rewrite in TypeScript

- [ ] Use ES instead of CommonJS for module source code

- [ ] Add ES/CommonJS inoperability