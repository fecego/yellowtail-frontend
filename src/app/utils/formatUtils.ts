
function formatPrice(price: number) {
  const float = ( Math.round( price * 100 ) / 100).toFixed(2);
  const stringPrice = `$ ${float}`;
  return stringPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export {
  formatPrice
}