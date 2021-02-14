const { Router } = require("express");
const UserController = require("./user.controller");
const router = Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logOutUser);

module.exports = router;
