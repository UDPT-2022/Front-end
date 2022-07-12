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
exports.getProductType = async () => {
  const rs = await axios({
    method: "get",
    url: URL + "/products/info/types",
  })
    .then((response) => response.data.LOAI_SP)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
exports.getProduct = async (id) => {
  const rs = await axios({
    method: "get",
    url: URL + "/products/" + id,
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
exports.getReviewProduct = async (id) => {
  const rs = await axios({
    method: "post",
    url: URL + "/reviews/search",
    data: {
      MA_SP: id,
    },
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
exports.reviewProduct = async (data) => {
  const rs = await axios({
    method: "post",
    url: URL + "/reviews",
    data: data,
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
          asd.SO_LUONG = asd.SO_LUONG ? asd.SO_LUONG + 1 : 1;
          flat = 1;
        }
      }
      if (flat == 0) {
        let a1 = products;
        a1.SO_LUONG = 1;
        cart.push(a1);
      }
      for (let asd of cart) {
        asd.total = asd.SO_LUONG * +asd.GIA_SP;
      }
      localStorage.setItem("cart_web", JSON.stringify(cart));
    } else {
      let a1 = products;
      a1.SO_LUONG = 1;
      let cart = [a1];
      localStorage.setItem("cart_web", JSON.stringify(cart));
    }
  });
};
exports.getAllCart = () => {
  const storedDataUserCart = localStorage.getItem("cart_web");
  return JSON.parse(storedDataUserCart);
};
exports.changQualityProductOnCart = (id, q) => {
  const storedDataUserCart = localStorage.getItem("cart_web");
  if (q < 1) {
    this.removeitemCart(id);
    return;
  }
  if (storedDataUserCart) {
    let cart = JSON.parse(storedDataUserCart);
    for (let asd of cart) {
      if (asd.MA_SP == id) {
        asd.SO_LUONG = q;
      }
    }
    for (let asd of cart) {
      asd.total = asd.SO_LUONG * +asd.GIA_SP;
    }
    localStorage.setItem("cart_web", JSON.stringify(cart));
  }
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
exports.searchProductByName = async (q, type) => {
  const rs = await axios({
    method: "post",
    url: URL + "/products/search",
    data: {
      TEN_SP: q,
      LOAI_SP: type,
    },
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
exports.createOrder = async (data) => {
  const rs = await axios({
    method: "post",
    url: URL + "/orders/with/detail",
    data: data,
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
exports.getAllOrderByUser = async (id) => {
  const rs = await axios({
    method: "post",
    url: URL + "/orders/search",
    data: {
      MA_NGUOI_DUNG: id,
    },
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};

exports.getOrderDetailByID = async (id) => {
  const rs = await axios({
    method: "get",
    url: URL + "/orders/" + id,
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
