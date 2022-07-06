const express = require("express");
const router = express.Router();

const shopController = require("../controllers/UserController");

router.get("/login", shopController.login);
router.post("/login", shopController.postLogin);
router.get("/register", shopController.register);
router.post("/register", shopController.postRegister);
router.post("/logout", shopController.logout);

module.exports = router;
