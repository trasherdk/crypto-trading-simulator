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
            backgroundColor: 'rgba(36, 166, 71, 0.3)',
            label: 'Valeur',
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
        price: `${price} €`,
        chart: chartScript,
        lastUpdate: moment
          .unix(lastUpdate)
          .startOf("minute")
          .fromNow()
      });
      data.sort((a, b) => {
        const indexA = cryptos.indexOf(a.pair.substr(0, 3));
        const indexB = cryptos.indexOf(b.pair.substr(0, 3));
        return (indexA === indexB) ? 0 : (indexA < indexB) ? -1 : 1
      });
    })
  ).then(() => {
    res.render("market", {
      data
    });
  });
};
