const axios = require('axios');

exports.index = (req, res) => {
  const cryptos = ["BTC", "ETH", "XRP", "BCH", "EOS", "ADA", "LTC", "XLM", "TRX"];
  const API_URL = "https://min-api.cryptocompare.com/data";
  const data = [];

  Promise.all(cryptos.map(async (crypto) => {
    const pricePromise = axios.get(`${API_URL}/price?fsym=${crypto}&tsyms=EUR`);
    const histoPromise = axios.get(`${API_URL}/histohour?fsym=${crypto}&tsym=EUR&limit=24`);

    const { data: { EUR: price } } = await pricePromise;
    const { data: { Data: histo }} = await histoPromise;

    const timeHistory = histo.reduce((acc, value) => {
      const { time } = value;
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
  })).then(() => {
    res.render('market', {
      data
    });
  });
};
