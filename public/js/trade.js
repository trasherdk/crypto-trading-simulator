(function() {
  const amountBuy = document.getElementById("amount-buy");
  const priceBuy = document.getElementById("price-buy");
  const totalBuy = document.getElementById("total-buy");

  const amountSell = document.getElementById("amount-sell");
  const priceSell = document.getElementById("price-sell");
  const totalSell = document.getElementById("total-sell");

  amountBuy.addEventListener(
    "input",
    function(e) {
      totalBuy.value = (e.target.value.trim() / priceBuy.value).toFixed(6);
    },
    false
  );

  priceBuy.addEventListener(
    "input",
    function(e) {
      totalBuy.value = (amountBuy.value / e.target.value.trim()).toFixed(6);
    },
    false
  );

  totalBuy.addEventListener(
    "input",
    function(e) {
      amountBuy.value = (e.target.value.trim() * priceBuy.value).toFixed(6);
    },
    false
  );

  amountSell.addEventListener(
    "input",
    function(e) {
      totalSell.value = (e.target.value.trim() * priceSell.value).toFixed(6);
    },
    false
  );

  priceSell.addEventListener(
    "input",
    function(e) {
      totalSell.value = (amountSell.value * e.target.value.trim()).toFixed(6);
    },
    false
  );

  totalSell.addEventListener(
    "input",
    function(e) {
      amountSell.value = (e.target.value.trim() / priceSell.value).toFixed(6);
    },
    false
  );
})();