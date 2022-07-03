const shop = require("../model/UserModel");

class UserController {
  login(req, res) {
    res.render("cus_login", {
      layout: "customer_layout",
    });
  }
  register(req, res) {
    res.render("cus_register", {
      layout: "customer_layout",
    });
  }
}

module.exports = new UserController();
