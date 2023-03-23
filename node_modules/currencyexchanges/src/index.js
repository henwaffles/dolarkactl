const fetch = (...args) => import('cross-fetch').then(({default: fetch}) => fetch(...args));
const uparser = require("url-parse");

/**
 * The ISO-4217 code representing a currency
 * @typedef {string} ISO4217
*/

/**
 * An API response object
 * @typedef {object} ExchangeRateResponse
*/

/**
 * Options that will be passed to exchangerate
 * @typedef {object} ExchangeRateOptions
 * @property {string} [url="https://api.exchangerate.host/latest"] The URL to a custom exchangerate.host instance
 * @property {ISO4217} [primaryCurrency=USD] The three-letter code for the currency of your choice, to be used as the primary currency for things like base
*/

class ExchangeRate {
    /**
     * The main exchangerate function class
     * @param {ExchangeRateOptions} [options] The options to be passed to exchangerate
     * @constructor
    */
    constructor(options = { url: "https://api.exchangerate.host", primaryCurrency: "USD" }) {
        this.url = uparser(options.url).protocol + "//" + uparser(options.url).host;
        this.primaryCurrency = options.primaryCurrency;
        
        if (this.url === 0 || this.url === "//" || this.url === undefined || this.url === null) this.url = "https://api.exchangerate.host";
        if (this.primaryCurrency === 0 || this.primaryCurrency === "//" || this.primaryCurrency === undefined || this.primaryCurrency === null) this.primaryCurrency = "USD"; 
    };

    /**
     * Get the current exchange rate for a currency. By default, exchange rates are to your primary currency (but can be customised using the to parameter).
     * @param {ISO4217} from The currency to convert from
     * @param {ISO4217} [to] The currency to convert the currency rate to
     * @returns {Promise<number>} The exchange rate between the two currencies
    */
    async getExchangeRate(from="GBP", to=this.primaryCurrency) {
        if (typeof from !== "string") throw new TypeError("Expected type is string:ISO4217. Type is: " + typeof from);

        const request = await fetch(`${this.url}/convert?from=${from}&to=${to}`)
            .then(res => res.json())
            .catch(() => { return "falseError" });
        if (request === "falseError") throw new Error("An error occurred while fetching the exchange rate");
        if (request.info.rate === null) throw new Error("An error occured while fetching the exchange rate: an invalid currency was entered, or no data is currently available");
        return request.info.rate;
    };

    /**
     * Get historical exchange rates between two time periods for a set of currencies. Exchange rates are to your primary currency. Data will cut off after 366 days.
     * @param {ISO4217[]} currencies An array of currencies to get historical rates for
     * @param {Date} startDate The start date of time to research historical rates (in JavaScript date format)
     * @param {Date} endDate The end date of time to research historical rates (in JavaScript date format)
     * @return {Promise<ExchangeRateResponse>} An object containing the historical exchange rates for the currencies requested
     */
    async getHistoricalRates(currencies, startDate, endDate) {
        if (!Array.isArray(currencies)) throw new TypeError("Expected type is array:ISO4217. Type is: " + typeof currencies);
        if (typeof startDate !== "object") throw new TypeError("Expected type is object:Date. Type is: " + typeof startDate);
        if (typeof endDate !== "object") throw new TypeError("Expected type is object:Date. Type is: " + typeof endDate);

        const request = await fetch(`${this.url}/timeseries?base=${this.primaryCurrency}&start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}&symbols=${currencies.join(",")}`)
            .then(res => res.json())
            .catch(() => { return "falseError" });

        if (request === "falseError") throw new Error("An error occurred while fetching historical exchange rates");
        if (request.rates === null) throw new Error("An error occured while fetching historical exchange rates: an invalid currency was entered, or no data is currently available");
        return request.rates;
    };

    /**
     * Get fluctuations between two time periods for a set of currencies. Exchange rates are to your primary currency. Data will cut off after 366 days.
     * @param {ISO4217[]} currencies An array of currencies to get fluctuation data for
     * @param {Date} startDate The start date of the time period for fluctuation (in JavaScript date format)
     * @param {Date} endDate The end date of the time period for fluctuation (in JavaScript date format)
     * @return {Promise<ExchangeRateResponse>} An object containing the exchange rates for the currencies requested, containing data for the start and end of each day, and a percentage of change from the start to the end of each day.
     */
    async getFluctuations(currencies, startDate, endDate) {
        if (!Array.isArray(currencies)) throw new TypeError("Expected type is array:ISO4217. Type is: " + typeof currencies);
        if (typeof startDate !== "object") throw new TypeError("Expected type is object:Date. Type is: " + typeof startDate);
        if (typeof endDate !== "object") throw new TypeError("Expected type is object:Date. Type is: " + typeof endDate);

        const request = await fetch(`${this.url}/fluctuation?base=${this.primaryCurrency}&start_date=${startDate.toISOString().split("T")[0]}&end_date=${endDate.toISOString().split("T")[0]}&symbols=${currencies.join(",")}`)
            .then(res => res.json())
            .catch(() => { return "falseError" });

        if (request === "falseError") throw new Error("An error occurred while fetching fluctuation data");
        if (request.rates === null) throw new Error("An error occured while fetching fluctuation data: an invalid currency was entered, or no data is currently available");
        return request.rates;
    };

    /**
     * Get current exchange rates for a set of currencies. Exchange rates are to your primary currency.
     * @param {ISO4217[]} currencies An array of currencies to get historical rates for
     * @return {Promise<ExchangeRateResponse>} An object containing the current exchange rates for the currencies requested
     */
    async getBulkExchangeRates(currencies) {
        if (!Array.isArray(currencies)) throw new TypeError("Expected type is array:ISO4217. Type is: " + typeof currencies);

        const request = await fetch(`${this.url}/latest?base=${this.primaryCurrency}&symbols=${currencies.join(",")}`)
            .then(res => res.json())
            .catch(() => { return "falseError" });

        if (request === "falseError") throw new Error("An error occurred while fetching historical exchange rates");
        if (request.rates === null) throw new Error("An error occured while fetching historical exchange rates: an invalid currency was entered, or no data is currently available");
        return request.rates;
    };

    /**
     * Get ISO 4217 currency codes that are supported by exchangerate.host and Forex.
     * @return {Promise<ExchangeRateResponse>} An object containing the ISO 4217 currency codes supported by exchangerate.host and Forex
     */
    async getISO4217Codes() {
        const request = await fetch(`${this.url}/symbols`)
            .then(res => res.json())
            .catch(() => { return "falseError" });

        if (request === "falseError") throw new Error("An error occurred while fetching ISO 4217 codes");
        return request.symbols;
    }
};

module.exports = ExchangeRate;
global.NodeExr = module.exports;