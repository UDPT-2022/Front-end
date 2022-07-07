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
        if (data === undefined) {
          res.redirect("/user/login?error=Tài khoản sai, mời nhập lại");
          return;
        }
        res.redirect("/");
        user.saveUser(data);
      })
      .catch(next);
  }
  register(req, res, next) {
    res.render("user/register", {
      layout: "main",
    });
  }
  postRegister(req, res, next) {
    Promise.all([user.register(req.body)])
      .then(([data]) => {
        console.log(data);
        res.redirect("/user/login");
      })
      .catch(next);
  }
  logout(req, res, next) {
    user.logout();
    res.redirect("/");
  }
}

module.exports = new UserController();
