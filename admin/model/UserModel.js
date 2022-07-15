const axios = require("axios");
const LocalStorage = require("node-localstorage").LocalStorage;
const URL = "http://localhost:8010/api";
const URL_CONTRACT = "http://localhost:8002/api";
localStorage = new LocalStorage("./scratch");

exports.login = async (data) => {
  const rs = await axios({
    method: "post",
    url: URL + "/login",
    data: data,
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
exports.saveUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};
exports.dropUser = () => {
  localStorage.removeItem("user");
};
exports.getUserLocal = () => {
  const localUser = localStorage.getItem("user");
  if (localUser) {
    let user = JSON.parse(localUser);
    return user.user;
  }
};
exports.logout = async () => {
  this.dropUser();
};
exports.register = async (data) => {
  const rs = await axios({
    method: "post",
    url: URL + "/register",
    data: data,
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
