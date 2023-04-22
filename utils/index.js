export const calculatePercent = (price, discount) => {
  return Math.abs(((discount - price) / price) * 100).toFixed(2);
};
