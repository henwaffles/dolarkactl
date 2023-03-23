const NodeExr = require("../index");

const ExchangeRate = new NodeExr();

(async function () {

    // Get the exchange rate for a given currency pair, with the first argument being the currency to convert and the second argument being the currency to convert to as a base. By default, the second argument is your primary currency.
    await ExchangeRate.getExchangeRate("EUR").then(console.log); 
    // => 1.18114
    // Response is as of 31 August 2021 (31/08/2021), converting EUR to USD.

    // Get historical data for a given set of currencies in a certain date range (up to 366 days). Results are automatically converted into your primary currency.
    await ExchangeRate.getHistoricalRates(["EUR", "USD", "CAD", "GBP"], new Date("2019-01-01"), new Date("2019-01-05")).then(console.log);
    /* => {
        '2019-01-01': { USD: 1.273745, GBP: 1, CAD: 1.733681, EUR: 1.108279 },
        '2019-01-02': { USD: 1.275682, GBP: 1, CAD: 1.737563, EUR: 1.112966 },
        '2019-01-03': { USD: 1.251991, GBP: 1, CAD: 1.706416, EUR: 1.106195 },
        '2019-01-04': { USD: 1.263, GBP: 1, CAD: 1.702184, EUR: 1.10877 },
        '2019-01-05': { USD: 1.263, GBP: 1, CAD: 1.702184, EUR: 1.10877 }
      }
    */
    // Response uses GBP rates, getting historical rates for USD, GBP, CAD, and EUR from 1 January to 5 January 2019 (1/1/2019-5/1/2019). Rates used are the rates from each respective date.

    // Get current exchange rates for multiple set of currencies. Results are automatically converted into your primary currency.
    await ExchangeRate.getBulkExchangeRates(["EUR", "USD", "CAD", "GBP"]).then(console.log);
    // => { CAD: 1.261974, EUR: 0.84664, GBP: 0.727282, USD: 1 }
    // Response is as of 31 August 2021 (31/08/2021), converting EUR, USD, CAD, and GBP to USD.
    
    // Get all ISO-4217 codes currently supported by Forex and exchangerate.host.
    await ExchangeRate.getISO4217Codes().then(console.log);
    // => Response too long to display

    // Get fluctuation data for a given set of currencies during a specific time period, with results automatically converted into your primary currency.
    // Fluctuation data includes rates for the start and the end of the day, and a percentage representing the how much the rate has changed since the start of the day.
    await ExchangeRate.getFluctuations(["EUR", "USD", "CAD", "GBP"], new Date("2019-01-01"), new Date("2019-01-05")).then(console.log);
    /* => {
        USD: { start_rate: 1, end_rate: 1, change: 0, change_pct: 0 },
        GBP: {
          start_rate: 0.785087,
          end_rate: 0.791765,
          change: -0.006678,
          change_pct: -0.008506
        },
        CAD: {
          start_rate: 1.361089,
          end_rate: 1.347731,
          change: 0.013358,
          change_pct: 0.009814
        },
        EUR: {
          start_rate: 0.870095,
          end_rate: 0.877886,
          change: -0.007791,
          change_pct: -0.008954
        }
      }
    */
   // Response fetches fluctuation data for USD, GBP, CAD, and EUR from 1 January to 5 January 2019 (1/1/2019-5/1/2019).
})();