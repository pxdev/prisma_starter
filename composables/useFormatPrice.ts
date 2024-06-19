export const useFormatPrice = (price: number) => {
  return new Intl.NumberFormat().format(price);
};
