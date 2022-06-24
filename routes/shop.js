const express = require("express");
const router = express.Router();

const shopController = require("../controllers/ShopController");

router.get("/", shopController.index);
router.get("/shop-grid", shopController.shopgrid);
router.get("/cart", shopController.cart);
router.get("/cart-history", shopController.shopingCartHistory);
router.get("/checkout", shopController.checkout);
router.get("/shop-near", shopController.shopnear);
router.get("/shop-details1", shopController.shopDetails1);
router.get("/item-detail", shopController.itemDetail);
module.exports = router;
