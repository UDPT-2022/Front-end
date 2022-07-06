const axios = require("axios");
const LocalStorage = require("node-localstorage").LocalStorage;
const URL = "http://localhost:8001/api";
localStorage = new LocalStorage("./scratch");

exports.allproducts = async () => {
  const rs = await axios({
    method: "get",
    url: URL + "/products",
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
exports.getProduct = async (id) => {
  const rs = await axios({
    method: "get",
    url: URL + "/products/" + id.toString(),
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
exports.getReviewProduct = async (id) => {
  const rs = await axios({
    method: "get",
    url: URL + "/reviews/" + id.toString(),
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};

exports.addItemToCart = (id) => {
  this.getProduct(id).then((products) => {
    const storedDataUserCart = localStorage.getItem("cart_web");
    if (storedDataUserCart) {
      let cart = JSON.parse(storedDataUserCart);
      let flat = 0;
      for (let asd of cart) {
        if (asd.MA_SP == products.MA_SP) {
          asd.quantity = asd.quantity ? asd.quantity + 1 : 1;
          flat = 1;
        }
      }
      if (flat == 0) {
        let a1 = products;
        a1.quantity = 1;
        cart.push(a1);
      }
      for (let asd of cart) {
        asd.total = asd.quantity * +asd.GIA_SP;
      }
      localStorage.setItem("cart_web", JSON.stringify(cart));
    } else {
      let a1 = products;
      a1.quantity = 1;
      let cart = [a1];
      localStorage.setItem("cart_web", JSON.stringify(cart));
    }
  });
};
exports.getAllCart = () => {
  const storedDataUserCart = localStorage.getItem("cart_web");
  return JSON.parse(storedDataUserCart);
};
exports.removeitemCart = (id) => {
  const storedDataUserCart = localStorage.getItem("cart_web");
  if (storedDataUserCart) {
    let cart = JSON.parse(storedDataUserCart);
    cart = cart.filter((item) => item.MA_SP != id);
    console.log(cart);
    localStorage.setItem("cart_web", JSON.stringify(cart));
  }
};
exports.searchProductByName = async (q) => {
  const rs = await axios({
    method: "post",
    url: URL + "/products/search",
    data: {
      TEN_SP: q,
    },
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
