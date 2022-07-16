const express = require("express");
const router = express.Router();

const shopController = require("../controllers/ShopController");

router.get("/shop-grid/:id", shopController.shopgrid);
router.get("/cart", shopController.cart);
router.get("/order", shopController.showOrder);
router.get("/order/:id", shopController.getOrderDetail);
router.get("/checkout", shopController.checkout);
router.post("/checkout", shopController.createOrder);
router.get("/shop-near", shopController.shopnear);
router.get("/shop-details1", shopController.shopDetails1);
router.get("/item-detail/:id", shopController.itemDetail);
router.get("/addcart/:id", shopController.addCart);
router.get("/removeitem/:id", shopController.removeitemCart);
router.get("/search", shopController.searchProductByName);
router.get("/changq", shopController.changQualityProductOnCart);
router.post("/review", shopController.reviewProduct);
router.get("/", shopController.index);
module.exports = router;
