const user = require("../model/UserModel");

class UserController {
  login(req, res) {
    res.render("cus_login", {
      layout: "customer_layout",
    });
  }
  postLogin(req, res) {
    user.login(req.body);
    res.redirect("/");
  }
  register(req, res) {
    res.render("cus_register", {
      layout: "customer_layout",
    });
  }
  postRegister(req, res) {
    console.log(req.body);
    res.redirect("/user/login");
  }
  logout() {
    user.logout();
    res.redirect("/");
  }
}

module.exports = new UserController();
