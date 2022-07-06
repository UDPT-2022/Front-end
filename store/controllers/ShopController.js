const shop = require("../model/ShopModel");

class ShopController {
  index(req, res, next) {
    Promise.all([shop.allproducts()])
      .then(([products]) =>
        res.render("cus_index", {
          layout: "customer_layout",
          products: products,
        })
      )
      .catch(next);
  }

  shopgrid(req, res) {
    res.render("cus_shop-details", {
      layout: "customer_layout",
    });
  }

  cart(req, res) {
    const products = shop.getAllCart();
    res.render("cus_shoping-cart", {
      layout: "customer_layout",
      products: products,
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

  itemDetail(req, res, next) {
    // Promise.all([
    //   shop.getProduct([req.params.id]),
    //   //shop.getReviewProduct([req.params.id]),
    // ])
    //   .then(([products]) =>
    //     res.render("cus_item-detail", {
    //       layout: "customer_layout",
    //       products: products,
    //       //reviews: reviews,
    //     })
    //   )
    //   .catch(next);
    Promise.all([
      shop.getProduct([req.params.id]),
      shop.getReviewProduct([req.params.id]),
    ])
      .then(([product, reviews]) => {
        console.log(product);
        console.log(reviews);
        res.render("cus_item-detail", {
          layout: "customer_layout",
          product: product,
          reviews: reviews,
        });
      })
      .catch(next);
    // const reviews = shop.getReviewProduct([req.params.id]);
    // console.log(reviews);
    // shop.getProduct([req.params.id]).then((product) => {
    //   console.log(product);
    //   res.render("cus_item-detail", {
    //     layout: "customer_layout",
    //     product: product,
    //   });
    // });
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
    Promise.all([shop.searchProductByName(req.query.q)])
      .then(([products]) =>
        res.render("cus_index", {
          layout: "customer_layout",
          products: products,
          value: req.query.q,
        })
      )
      .catch(next);
  }
}

module.exports = new ShopController();
