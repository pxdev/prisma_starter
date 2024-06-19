export const useNumberFormatter = (number: number): string | number => {
  if (number < 9) {
    return `0${number}`;
  } else if (number === 9) {
    return 10;
  }
  return number;
};
