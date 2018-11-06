export default {
  allReadyToCheckout(cart) {
    if (!cart) return false;
    return cart.every(c => c.owner.isReadyToCheckout);
  }
};
