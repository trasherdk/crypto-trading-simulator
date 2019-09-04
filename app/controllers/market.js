const axios = require("axios");
const moment = require("moment");
const API_URL = "https://min-api.cryptocompare.com/data";
moment.locale("en");
const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

const Trading = mongoose.model("Trading");
const User = mongoose.model("User");
const Wallet = mongoose.model("Wallet");

exports.index = (req, res) => {
	const cryptos = [
		"BTC",
		"XMR",
		"ETH",
		"ETC",
		"BCH",
//		"TRTL",
//		"BSV",
//		"TUBE",
//		"ETHB",
//		"GRFT",
//		"AEON",
//		"XRP",
//		"DASH",
//		"BCHSV",
//		"BCHABC",
//		"BTCD",
//		"LTC",
//		"EOS",
//		"ADA",
//		"XLM",
//		"TRX"
  ];
  const data = [];

  Promise.all(
    cryptos.map(async crypto => {
      console.log('Fetch %s data', crypto);
      
      const pricePromise = axios.get(
        `${API_URL}/price?e=Kraken&fsym=${crypto}&tsyms=EUR,USD`
      );
      const histoPromise = axios.get(
        `${API_URL}/histohour?e=Kraken&fsym=${crypto}&tsym=EUR&limit=36`
      );
      const {
        data: { EUR: eurprice, USD: usdprice }
      } = await pricePromise;
      const {
        data: { Data: histo }
      } = await histoPromise;


      let lastUpdate = 0;
      const timeHistory = histo.reduce((acc, value) => {
        const { time } = value;
        lastUpdate = time;
        const formatedTime = moment.unix(time).format("HH:mm");
        acc.push(`'${formatedTime}'`);
        return acc;
      }, []);
      
      const valuesHistory = histo.reduce((acc, value) => {
        const { close } = value;
        acc.push(close);
        return acc;
      }, []);
      
      const chartScript = `var ctx = document.getElementById('${crypto}EUR');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [${timeHistory}],
        datasets: [{
            backgroundColor: 'rgba(36, 166, 71, 0.3)',
            label: 'Value',
            data: [${valuesHistory}],
            borderColor: 'rgba(36, 166, 71, 1)',
            borderWidth: 3
        }]
    },
    options: {
      tooltips: {
        intersect: false
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: 'white',
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: 'white',
          }
        }]
      },
      legend: {
          display: false
      },
    }
});`;


      data.push({
        pair: `${crypto}-EUR`,
        id: `${crypto}EUR`,
        eurprice: `${eurprice} €`,
        usdprice: `${usdprice} $`,
        chart: chartScript,
        lastUpdate: moment
          .unix(lastUpdate)
          .startOf("minute")
          .fromNow()
      });
/**/      data.sort((a, b) => {
	
        const indexA = cryptos.indexOf(a.pair.substr(0, 3));
        const indexB = cryptos.indexOf(b.pair.substr(0, 3));
        console.log('indexA: %s, indexB: %s', a.pair.substr(0, 3), b.pair.substr(0, 3));
        return indexA === indexB ? 0 : indexA < indexB ? -1 : 1;
      });
/**/    })
  ).then(() => {
    const isConnected = typeof req.session.id !== "undefined";

    res.render("market", {
      data,
      isConnected
    });
  })
  .catch(e => {
  	console.log('market.js Promise.all catch', e);
  });
};

exports.pair = async (req, res) => {
  const { pair } = req.params;
  const pairNames = pair.split("-");
  const pairFrom = pairNames[0].toUpperCase();
  const pairTo = pairNames[1].toUpperCase();

  const {
    data: { EUR: eurprice, USD: usdprice }
  } = await axios.get(`${API_URL}/price?e=Kraken&fsym=${pairFrom}&tsyms=${pairTo},USD`);
  const {
    data: { Data: histo }
  } = await axios.get(
    `${API_URL}/histohour?e=Kraken&fsym=${pairFrom}&tsym=${pairTo}&limit=36`
  );

  let lastUpdate = 0;
  const timeHistory = histo.reduce((acc, value) => {
    const { time } = value;
    lastUpdate = time;
    const formatedTime = moment.unix(time).format("HH:mm");
    acc.push(`'${formatedTime}'`);
    return acc;
  }, []);
  const valuesHistory = histo.reduce((acc, value) => {
    const { close } = value;
    acc.push(close);
    return acc;
  }, []);
  const chartScript = `var ctx = document.getElementById('${pairFrom}EUR');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [${timeHistory}],
        datasets: [{
            backgroundColor: 'rgba(36, 166, 71, 0.3)',
            label: 'Value',
            data: [${valuesHistory}],
            borderColor: 'rgba(36, 166, 71, 1)',
            borderWidth: 3
        }]
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        intersect: false
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: 'white',
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: 'white',
          }
        }]
      },
      legend: {
          display: false
      },
    }
});`;
  let wallet = await Wallet.findById(req.session.walletId, function(
    err,
    wallet
  ) {
    return wallet;
  });
  let balanceCurrency = wallet.cryptos.find(function(crypto) {
    return crypto.currency === pairFrom;
  });
  balanceCurrency =
    balanceCurrency !== undefined ? balanceCurrency.currency_qty : 0;
  const currencyList = [wallet.currency_qty, balanceCurrency];

  const data = {
    balanceCurrency: currencyList[1],
    balanceEUR: currencyList[0].toFixed(6),
    currency: pairFrom,
    pair: `${pairFrom}-EUR`,
    id: `${pairFrom}EUR`,
    priceNumber: eurprice,
    eurprice: `${eurprice} €`,
    usdprice: `${usdprice} $`,
    chart: chartScript,
    lastUpdate: moment
      .unix(lastUpdate)
      .startOf("minute")
      .fromNow()
  };
console.log(data.currencyList);
  const isConnected = typeof req.session.id !== "undefined";
  res.render("trade", {
    data,
    isConnected,
    csrfToken: req.csrfToken()
  });
};

exports.trade = function(req, res) {
  let trade = new Trading({
    src_currency: req.body.src_currency,
    src_value: req.body.src_value,
    dst_currency: req.body.dst_currency,
    dst_value: req.body.dst_value,
    date: Date.now()
  });

  trade.save();

  User.findByIdAndUpdate(req.session.id, { $push: { trading: trade } }).exec();
  // Wallet.findByIdAndUpdate(req.session.walletId, { $push: { cryptos: { currency:req.body.dst_currency, currency_qty:req.body.dst_value } } }).exec();

  switch (req.body.action) {
    case "sell":
      Wallet.findById(req.session.walletId, function(err, wallet) {
        let currentCrypto = wallet.cryptos.find(function(crypto) {
          return crypto.currency === req.body.src_currency;
        });
        if (currentCrypto.currency_qty >= req.body.src_value) {
          wallet.update({ $inc: { currency_qty: req.body.dst_value } }).exec();
          let crypto = wallet.cryptos.find(function(crypto) {
            return crypto.currency === req.body.src_currency;
          });
          if (crypto === undefined) {
            let cryptoToAdd = {
              currency: req.body.src_currency,
              currency_qty: req.body.src_value
            };
            Wallet.findByIdAndUpdate(req.session.walletId, {
              $push: { cryptos: cryptoToAdd }
            }).exec();
          } else {
            Wallet.update(
              { "cryptos.currency": crypto.currency },
              {
                $inc: { "cryptos.$.currency_qty": -req.body.src_value }
              }
            ).exec();
          }
        }
      });
      break;
    case "buy":
      Wallet.findById(req.session.walletId, function(err, wallet) {
        if (wallet.currency_qty >= req.body.src_value) {
          wallet.update({ $inc: { currency_qty: -req.body.src_value } }).exec();

          let crypto = wallet.cryptos.find(function(crypto) {
            return crypto.currency === req.body.dst_currency;
          });
          if (crypto === undefined) {
            let cryptoToAdd = {
              currency: req.body.dst_currency,
              currency_qty: req.body.dst_value
            };
            Wallet.findByIdAndUpdate(req.session.walletId, {
              $push: { cryptos: cryptoToAdd }
            }).exec();
          } else {
            Wallet.update(
              { "cryptos.currency": crypto.currency },
              {
                $inc: { "cryptos.$.currency_qty": req.body.dst_value }
              }
            ).exec();
          }
        }
      });
      break;
    default:
      break;
  }
  return res.redirect(req.originalUrl);
};
