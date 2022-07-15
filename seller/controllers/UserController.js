const user = require("../model/UserModel");

class UserController {
  login(req, res, next) {
    res.render("user/login", {
      layout: "main",
      error: req.query.error,
    });
  }
  postLogin(req, res, next) {
    Promise.all([user.login(req.body)])
      .then(([data]) => {
        if (data === undefined || data.user.role != "SELLER") {
          res.redirect("/user/login?error=Tài khoản sai, mời nhập lại");
          return;
        }
        user.saveUser(data);
        res.redirect("/");
      })
      .catch(next);
  }
  register(req, res, next) {
    res.render("user/register", {
      layout: "main",
    });
  }
  postRegister(req, res, next) {
    req.body.EMAIL = req.body.email;
    Promise.all([user.register(req.body)])
      .then(([data]) => {
        res.redirect("/user/login");
      })
      .catch(next);
  }
  contract(req, res, next) {
    const usercr = user.getUserLocal();
    res.render("user/create_contract", {
      layout: "main",
      user: usercr,
    });
  }
  postContract(req, res, next) {
    user.updateContract(req.body);
    res.render("user/success_contract", {
      layout: "main",
    });
  }
  logout(req, res, next) {
    user.logout();
    res.redirect("/");
  }
}

module.exports = new UserController();
