const shop = require("../model/ShopModel");
const user = require("../model/UserModel");
class ShopController {
  index(req, res, next) {
    const usercr = user.getUserLocal();
    if (!usercr) {
      res.redirect("/user/login");
      return;
    }
    if (!user.checkHasContract()) {
      res.redirect("/user/contract");
      return;
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
    res.redirect("/");
  }
  update(req, res, next) {
    const usercr = user.getUserLocal();
    if (!usercr) {
      res.redirect("/user/login");
      return;
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
      return;
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
      return;
    }
    shop.deleteProduct(req.params.id);
    res.redirect("/");
  }

  showOrder(req, res, next) {
    const usercr = user.getUserLocal();
    Promise.all([shop.getAllOrderByUser(usercr.id)])
      .then(([orders]) => {
        res.render("shop/cus_shoping-cart-history", {
          layout: "main",
          user: usercr,
          orders: orders,
        });
      })
      .catch(next);
  }

  getOrderDetail(req, res, next) {
    const usercr = user.getUserLocal();
    Promise.all([shop.getOrderDetailByID(req.params.id)])
      .then(([order]) => {
        res.render("shop/cus_order_detail", {
          layout: "main",
          user: usercr,
          order: order,
        });
      })
      .catch(next);
  }

  prepareOrder(req, res, next) {
    const usercr = user.getUserLocal();
    if (!usercr) {
      res.redirect("/user/login");
      return;
    }
    shop.prepareOrder(req.params.id);
    res.redirect("/order");
  }
  completeOrder(req, res, next) {
    const usercr = user.getUserLocal();
    if (!usercr) {
      res.redirect("/user/login");
      return;
    }
    shop.completeOrder(req.params.id);
    res.redirect("/order");
  }
}

module.exports = new ShopController();
