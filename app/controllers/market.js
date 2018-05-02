const axios = require('axios');

exports.index = (req, res) => {
  const cryptos = ["BTC", "ETH", "XRP", "BCH", "EOS", "ADA", "LTC", "XLM", "TRX"];
  const API_URL = "https://min-api.cryptocompare.com/data";
  const data = [];
  cryptos.forEach(crypto => {
    const pricePromise = axios.get(`${API_URL}/price?fsym=${crypto}&tsyms=EUR`);
    const histoPromise = axios.get(`${API_URL}/histohour?fsym=${crypto}&tsym=EUR&limit=24`);
    Promise.all([pricePromise, histoPromise]).then((result) => {
      const [priceResult, histoResult] = result;
      const { data: { EUR: price } } = priceResult;
      const { data: { Data: histo }} = histoResult;
      const timeHistory = histo.reduce((acc, value) => {
        const { time, close } = value;
        acc.push(time);
        return acc;
      }, []);
      const valuesHistory = histo.reduce((acc, value) => {
        const { close } = value;
        acc.push(close);
        return acc;
      }, []);
      data.push({
        pair: `${crypto}-EUR`,
        price,
        history: [ timeHistory, valuesHistory],
      });
    });
  });
  res.render('market', {
    data
  })
};
