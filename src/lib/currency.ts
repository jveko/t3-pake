export const currencyFormatter = (value: number | string) => {
  if (typeof value == "string") {
    value = Number(value);
  }
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  }).format(value);

  return formattedPrice;
};
