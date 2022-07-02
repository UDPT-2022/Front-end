const axios = require("axios");
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
exports.addCart = async (data) => {
  const rs = await axios({
    method: "post",
    url: "/carts",
    data: data,
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
