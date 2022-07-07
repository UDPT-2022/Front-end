const shop = require("../model/ShopModel");
const user = require("../model/UserModel");
class ShopController {
  checkLogin() {
    const usercr = user.getUserLocal();
    if (!usercr) {
      res.redirect("/user/login");
      return false;
    }
    return usercr;
  }
  index(req, res, next) {
    const usercr = user.getUserLocal();
    if (!usercr) {
      res.redirect("/user/login");
    }
    Promise.all([shop.getAllProductBySeller(usercr.id)])
      .then(([products]) =>
        res.render("shop/show", {
          layout: "main",
          products: products,
          user: usercr,
        })
      )
      .catch(next);
  }
  create(req, res, next) {
    res.render("shop/create", {
      user: user.getUserLocal(),
    });
  }
  store(req, res, next) {
    shop.addProduct(req.body);
    res.redirect("back");
  }
  update(req, res, next) {
    const usercr = user.getUserLocal();
    if (!usercr) {
      res.redirect("/user/login");
    }
    Promise.all([shop.getProduct(req.params.id)])
      .then(([product]) =>
        res.render("shop/update", {
          layout: "main",
          product: product,
          user: usercr,
        })
      )
      .catch(next);
  }
  updateProduct(req, res, next) {
    shop.updateProduct(req.body);
    res.redirect("/");
  }
  searchProductByName(req, res, next) {
    const usercr = user.getUserLocal();
    if (!usercr) {
      res.redirect("/user/login");
    }
    Promise.all([shop.searchProductByName(req.query.q, usercr.id)])
      .then(([products]) =>
        res.render("shop/show", {
          layout: "main",
          products: products,
          value: req.query.q,
          user: usercr,
        })
      )
      .catch(next);
  }
  deleteProduct(req, res, next) {
    const usercr = user.getUserLocal();
    if (!usercr) {
      res.redirect("/user/login");
    }
    shop.deleteProduct(req.params.id);
    res.redirect("/");
  }
}

module.exports = new ShopController();
