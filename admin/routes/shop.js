const express = require("express");
const router = express.Router();

const shopController = require("../controllers/ShopController");

router.get("/all", shopController.getAllContract);
router.get("/accept/:id", shopController.acceptContract);
router.get("/revoke/:id", shopController.revokeContract);
router.get("/", shopController.getAllContractWaitAccept);
module.exports = router;
