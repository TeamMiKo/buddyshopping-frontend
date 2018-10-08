const formatKet = key => "BuddyShopping".concat(":").concat(key);

export default {
  get(key) {
    return sessionStorage.getItem(formatKet(key));
  },
  set(key, val) {
    sessionStorage.setItem(formatKet(key), val);
    return val;
  }
};
