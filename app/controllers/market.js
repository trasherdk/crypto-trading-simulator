const axios = require("axios");
const moment = require("moment");

exports.index = (req, res) => {
  const cryptos = [
    "BTC",
    "ETH",
    "XRP",
    "BCH",
    "EOS",
    "ADA",
    "LTC",
    "XLM",
    "TRX"
  ];
  const API_URL = "https://min-api.cryptocompare.com/data";
  const data = [];

  Promise.all(
    cryptos.map(async crypto => {
      const pricePromise = axios.get(
        `${API_URL}/price?fsym=${crypto}&tsyms=EUR`
      );
      const histoPromise = axios.get(
        `${API_URL}/histohour?fsym=${crypto}&tsym=EUR&limit=24`
      );

      const {
        data: { EUR: price }
      } = await pricePromise;
      const {
        data: { Data: histo }
      } = await histoPromise;

      let lastUpdate = 0;
      const timeHistory = histo.reduce((acc, value) => {
        const { time } = value;
        lastUpdate = time;
        const formatedTime = moment.unix(time).format("hh:mm");
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
            label: 'Évolution dernières 24h',
            data: [${valuesHistory}],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});`;
      data.push({
        pair: `${crypto}-EUR`,
        id: `${crypto}EUR`,
        price,
        chart: chartScript,
        lastUpdate: moment
          .unix(lastUpdate)
          .startOf("minute")
          .fromNow()
      });
    })
  ).then(() => {
    res.render("market", {
      data
    });
  });
};
