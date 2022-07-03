const express = require("express");
const router = express.Router();

const shopController = require("../controllers/UserController");

router.get("/login", shopController.login);
router.get("/register", shopController.register);

module.exports = router;
