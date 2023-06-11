export const currencyFormatter = (value: number) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  }).format(value);

  return formattedPrice;
};
