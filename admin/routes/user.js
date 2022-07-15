const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

router.get("/login", userController.login);
router.post("/login", userController.postLogin);
router.get("/register", userController.register);
router.post("/register", userController.postRegister);
router.get("/contract", userController.contract);
router.post("/contract", userController.postContract);
router.get("/logout", userController.logout);

module.exports = router;
