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

exports.addProduct = async (data) => {
  const rs = await axios({
    method: "post",
    url: URL + "/products",
    data: data,
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
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

exports.deleteProduct = async (id) => {
  const rs = await axios({
    method: "delete",
    url: URL + "/products/" + id,
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
