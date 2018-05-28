(function() {
  const amountBuy = document.getElementById("amount-buy");
  const priceBuy = document.getElementById("price-buy");
  const totalBuy = document.getElementById("total-buy");
  const buttonBuy = document.getElementById("button-buy");
  const balanceEur = document.getElementById("balance-eur");

  const amountSell = document.getElementById("amount-sell");
  const priceSell = document.getElementById("price-sell");
  const totalSell = document.getElementById("total-sell");
  const buttonSell = document.getElementById("button-sell");
  const balanceCurrency = document.getElementById("balance-currency");

  const checkBalance = (balance, target, button) => {
    if (parseFloat(target.value) > parseFloat(balance.innerHTML.trim())) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  };

  amountBuy.addEventListener(
    "input",
    function(e) {
      totalBuy.value = (e.target.value.trim() / priceBuy.value).toFixed(6);
      checkBalance(balanceEur, amountBuy, buttonBuy);
    },
    false
  );

  priceBuy.addEventListener(
    "input",
    function(e) {
      totalBuy.value = (amountBuy.value / e.target.value.trim()).toFixed(6);
      checkBalance(balanceEur, amountBuy, buttonBuy);
    },
    false
  );

  totalBuy.addEventListener(
    "input",
    function(e) {
      amountBuy.value = (e.target.value.trim() * priceBuy.value).toFixed(6);
      checkBalance(balanceEur, amountBuy, buttonBuy);
    },
    false
  );

  amountSell.addEventListener(
    "input",
    function(e) {
      totalSell.value = (e.target.value.trim() * priceSell.value).toFixed(6);
      checkBalance(balanceCurrency, amountSell, buttonSell);
    },
    false
  );

  priceSell.addEventListener(
    "input",
    function(e) {
      totalSell.value = (amountSell.value * e.target.value.trim()).toFixed(6);
      checkBalance(balanceCurrency, amountSell, buttonSell);
    },
    false
  );

  totalSell.addEventListener(
    "input",
    function(e) {
      amountSell.value = (e.target.value.trim() / priceSell.value).toFixed(6);
      checkBalance(balanceCurrency, amountSell, buttonSell);
    },
    false
  );
})();
