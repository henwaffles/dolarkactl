var myHeaders = new Headers();
myHeaders.append("apikey", "0CCi5x76FBndTL9TO20b6rjymhG9xg1q");

var amount = 1; // amount to convert
var from = 'USD'; // convert from USD
var to = 'TRY'; // convert to TRY

var url = `https://api.apilayer.com/exchangerates_data/convert?from=${from}&to=${to}&amount=${amount}`;

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch(url, requestOptions)
    .then(response => response.json()) // parse response as JSON
    .then(data => {
        const result = data.result; // get result value from data object
        document.getElementById("dolar").innerHTML = result; // set result value to HTML element
    })
  .catch(error => console.log('error', error));