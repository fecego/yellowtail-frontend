
function formatPrice(price: number) {
  const float = ( Math.round( price * 100 ) / 100).toFixed(2);
  return `$ ${float}`
};

export {
  formatPrice
}