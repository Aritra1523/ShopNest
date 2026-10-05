export const CURRENCY_SYMBOL = "₹";

export const formatPrice = (value: number): string =>
  `${CURRENCY_SYMBOL}${value.toFixed(2)}`;
