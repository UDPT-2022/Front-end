const express = require("express");
const router = express.Router();

const shopController = require("../controllers/ShopController");

router.get("/create", shopController.create);
router.post("/create", shopController.store);
router.get("/update/:id", shopController.update);
router.post("/update", shopController.updateProduct);
router.get("/delete/:id", shopController.deleteProduct);
router.get("/search", shopController.searchProductByName);
router.get("/", shopController.index);

router.get("/order", shopController.showOrder);
router.get("/order/:id", shopController.getOrderDetail);
router.get("/order/prepare/:id", shopController.prepareOrder);
router.get("/order/complete/:id", shopController.completeOrder);
module.exports = router;
