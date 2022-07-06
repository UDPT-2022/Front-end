const shop = require("../model/ShopModel");

class ShopController {
  index(req, res, next) {
    Promise.all([shop.allproducts()])
      .then(([products]) =>
        res.render("shop/show", {
          layout: "main",
          products: products,
        })
      )
      .catch(next);
  }
  create(req, res, next) {
    res.render("shop/create");
  }
  store(req, res, next) {
    //shop.addProduct();
    res.redirect("/");
  }
  update(req, res, next) {
    Promise.all([shop.getProduct(req.params.id)])
      .then(([product]) =>
        res.render("shop/update", {
          layout: "main",
          product: product,
        })
      )
      .catch(next);
  }
  updateProduct(req, res, next) {
    shop.updateProduct(req.body);
  }
  searchProductByName(req, res, next) {
    Promise.all([shop.searchProductByName(req.query.q)])
      .then(([products]) =>
        res.render("shop/show", {
          layout: "main",
          products: products,
          value: req.query.q,
        })
      )
      .catch(next);
  }
  deleteProduct(req, res, next) {
    shop.deleteProduct(req.params.id);
    res.redirect("/");
  }
}

module.exports = new ShopController();
