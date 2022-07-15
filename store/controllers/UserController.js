const user = require("../model/UserModel");

class UserController {
  login(req, res, next) {
    res.render("cus_login", {
      layout: "customer_layout",
      error: req.query.error,
    });
  }
  postLogin(req, res, next) {
    Promise.all([user.login(req.body)])
      .then(([data]) => {
        if (data === undefined || data.user.role != "BUYER") {
          res.redirect("/user/login?error=Tài khoản sai, mời nhập lại");
          return;
        }
        res.redirect("/");
        user.saveUser(data);
      })
      .catch(next);
  }
  register(req, res, next) {
    res.render("cus_register", {
      layout: "customer_layout",
    });
  }
  postRegister(req, res, next) {
    Promise.all([user.register(req.body)])
      .then(([data]) => {
        res.redirect("/user/login");
      })
      .catch(next);
  }
  logout(req, res, next) {
    user.logout();
    res.redirect("/");
  }
  profileUser(req, res, next) {
    res.render("cus_user", {
      layout: "customer_layout",
      user: user.getUserLocal(),
    });
  }
  updateUser(req, res, next) {}
}

module.exports = new UserController();
