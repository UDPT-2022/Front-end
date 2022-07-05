const axios = require("axios");
const LocalStorage = require("node-localstorage").LocalStorage;
const URL = "http://localhost:8002/api";

exports.login = async (q) => {
  const rs = await axios({
    method: "post",
    url: URL + "/login",
    data: q,
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
exports.logout = async (q) => {
  const rs = await axios({
    method: "post",
    url: URL + "/logout",
    data: q,
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
exports.logout = async (q) => {
  const rs = await axios({
    method: "post",
    url: URL + "/register",
    data: q,
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
