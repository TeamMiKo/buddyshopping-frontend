export default {
  getTotal() {
    return new Promise((resolve, reject) => {
      window.Ecwid.cart.calculateTotal(order => {
        resolve(order.total);
      });
    });
  },

  clear() {
    window.Ecwid.Cart.clear();
  },
  addProduct(product) {
    return new Promise(callback => {
      window.Ecwid.Cart.addProduct({
        ...product,
        callback
      });
    });
  },
  addProductsFromCart(cart) {
    const addCartPromises = cart.map(c => {
      c.content.items.map(i => {
        this.addProduct({
          id: i.product.id,
          quantity: i.quantity
        });
      });
    });

    return Promise.all(addCartPromises);
  },
  gotoCheckout() {
    window.Ecwid.Cart.gotoCheckout();
  },
  openPage(page, options) {
    window.Ecwid.openPage(page, options);
  }
};
