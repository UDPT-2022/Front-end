const express = require("express");
const router = express.Router();

const shopController = require("../controllers/UserController");

router.get("/login", shopController.login);
router.post("/login", shopController.postLogin);
router.get("/register", shopController.register);
router.post("/register", shopController.postRegister);
router.get("/logout", shopController.logout);
router.get("/account/profile", shopController.profileUser);
router.post("/account/profile", shopController.updateUser);
module.exports = router;
