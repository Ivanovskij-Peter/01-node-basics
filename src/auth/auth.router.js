const { Router } = require("express");

const AuthController = require("./auth.controller");
const { validate } = require("../helpers/validate.middleware");
const { registerUserSchema } = require("./auth.shemes");
const { asyncWrapper } = require("../helpers/async.wrapper");
const { autorize } = require("../helpers/auth.middleware");
const router = Router();

router.post(
  "/register",
  validate(registerUserSchema),
  AuthController.createUser
);
router.post(
  "/login",
  validate(registerUserSchema),
  asyncWrapper(AuthController.loginUser)
);
router.post("/logout", autorize, asyncWrapper(AuthController.logOutUser));

module.exports = router;
