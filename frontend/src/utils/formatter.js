export function currencyFormatter({ currency, amount }) {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currency,
  });
  return formatter.format(amount);
}

export function decimalFormatter({ amount, decimal }) {
  const decimalInAmount = amount.toString().split(".")[1];
  if (decimalInAmount) {
    return `${decimalInAmount}`;
  } else {
    return `${decimal || "00"}`;
  }
}
