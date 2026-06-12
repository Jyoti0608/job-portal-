import currency from "currency.js";

const formatMoney = (amount) => {
  return currency(amount, {
    symbol: "₹",
    precision: 2,
    separator: ",",
    decimal: ".",
  }).format();
};

export default formatMoney;