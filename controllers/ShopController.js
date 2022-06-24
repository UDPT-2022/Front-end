const shop = require("../model/Shop");

class ShopController {
  index(req, res) {
    res.render("cus_index", {
      layout: "customer_layout",
    });
  }

  shopgrid(req, res) {
    res.render("cus_shop-details", {
      layout: "customer_layout",
    });
  }

  cart(req, res) {
    res.render("cus_shoping-cart", {
      layout: "customer_layout",
    });
  }

  shopingCartHistory(req, res) {
    res.render("cus_shoping-cart-history", {
      layout: "customer_layout",
    });
  }

  checkout(req, res) {
    res.render("cus_checkout", {
      layout: "customer_layout",
    });
  }

  shopnear(req, res) {
    res.render("cus_nearest-shop", {
      layout: "customer_layout",
    });
  }

  shopDetails1(req, res) {
    res.render("cus_shop-details-not-exists", {
      layout: "customer_layout",
    });
  }

  itemDetail(req, res) {
    res.render("cus_item-detail", {
      layout: "customer_layout",
    });
  }
}

module.exports = new ShopController();
