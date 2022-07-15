const axios = require("axios");
const LocalStorage = require("node-localstorage").LocalStorage;
const URL = "http://localhost:8002/api";
const URL_CONTRACT = "http://localhost:8010/api";
localStorage = new LocalStorage("./scratch");

exports.getAllContract = async () => {
  const rs = await axios({
    method: "get",
    url: URL + "/contract",
    data: {},
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
exports.getAllContractWaitAccept = async () => {
  const rs = await axios({
    method: "post",
    url: URL + "/contract/search",
    data: {
      HOP_DONG_DA_XET_DUYET: 0,
    },
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
exports.acceptContract = async (id) => {
  const rs = await axios({
    method: "put",
    url: URL_CONTRACT + "/contract/" + id + "/admin/accept",
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
exports.revokeContract = async (id) => {
  const rs = await axios({
    method: "delete",
    url: URL + "/contract/" + id,
  })
    .then((response) => response.data)
    .catch((error) => console.log("errrrrrrr : ", error));
  return rs;
};
