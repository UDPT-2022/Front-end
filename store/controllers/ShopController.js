const shop = require("../model/ShopModel");
const user = require("../model/UserModel");

class ShopController {
  index(req, res, next) {
    Promise.all([shop.allproducts(), shop.getProductType()])
      .then(([products, types]) => {
        res.render("cus_index", {
          layout: "customer_layout",
          products: products,
          types: types,
          user: user.getUserLocal(),
        });
      })
      .catch(next);
  }

  shopgrid(req, res) {
    res.render("cus_shop-details", {
      layout: "customer_layout",
      user: user.getUserLocal(),
    });
  }

  cart(req, res) {
    const products = shop.getAllCart();
    res.render("cus_shoping-cart", {
      layout: "customer_layout",
      products: products,
      user: user.getUserLocal(),
    });
  }

  shopingCartHistory(req, res) {
    res.render("cus_shoping-cart-history", {
      layout: "customer_layout",
      user: user.getUserLocal(),
    });
  }

  checkout(req, res) {
    const usercr = user.getUserLocal();
    if (!usercr) {
      res.redirect("/user/login");
      return;
    }
    const products = shop.getAllCart();
    res.render("cus_checkout", {
      layout: "customer_layout",
      user: user.getUserLocal(),
      products: products,
    });
  }

  createOrder(req, res, next) {
    const products = shop.getAllCart();
  }

  shopnear(req, res) {
    res.render("cus_nearest-shop", {
      layout: "customer_layout",
      user: user.getUserLocal(),
    });
  }

  shopDetails1(req, res) {
    res.render("cus_shop-details-not-exists", {
      layout: "customer_layout",
      user: user.getUserLocal(),
    });
  }

  itemDetail(req, res, next) {
    Promise.all([
      shop.getProduct(req.params.id),
      shop.getReviewProduct(req.params.id),
    ])
      .then(([product, reviews]) => {
        res.render("cus_item-detail", {
          layout: "customer_layout",
          product: product,
          reviews: reviews,
          user: user.getUserLocal(),
        });
      })
      .catch(next);
  }

  addCart(req, res, next) {
    shop.addItemToCart([req.params.id]);
    res.redirect("back");
  }

  removeitemCart(req, res, next) {
    shop.removeitemCart([req.params.id]);
    res.redirect("back");
  }

  searchProductByName(req, res, next) {
    Promise.all([
      shop.searchProductByName(req.query.q, req.query.type),
      shop.getProductType(),
    ])
      .then(([products, types]) =>
        res.render("cus_index", {
          layout: "customer_layout",
          products: products,
          value: req.query.q,
          //types: types,
          user: user.getUserLocal(),
        })
      )
      .catch(next);
  }
  changQualityProductOnCart(req, res, next) {
    shop.changQualityProductOnCart(req.query.id, req.query.q);
    res.redirect("/cart");
  }
  reviewProduct(req, res, next) {
    shop.reviewProduct(req.body);
    res.redirect("back");
  }
}

module.exports = new ShopController();
