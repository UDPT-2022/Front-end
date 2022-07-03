const axios = require("axios");
//const localStorage = require("node-localstorage");
axios.defaults.baseURL = "http://localhost:8001/api";

exports.allproducts = async () => {
  const rs = await axios({
    method: "get",
    url: "/products",
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
exports.getProduct = async (id) => {
  const rs = await axios({
    method: "get",
    url: "/products/" + id.toString(),
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};

exports.addItemToCart = (id) => {
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
  }
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
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
  }
  const storedDataUserCart = localStorage.getItem("cart_web");
  return JSON.parse(storedDataUserCart);
};
exports.removeitemCart = (id) => {
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
  }
  const storedDataUserCart = localStorage.getItem("cart_web");
  if (storedDataUserCart) {
    let cart = JSON.parse(storedDataUserCart);
    cart = cart.filter((item) => item.MA_SP != id);
    console.log(cart);
    localStorage.setItem("cart_web", JSON.stringify(cart));
  }
};
