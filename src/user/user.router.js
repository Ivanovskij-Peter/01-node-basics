const { Router } = require("express");
const { asyncWrapper } = require("../helpers/async.wrapper");
const { autorize } = require("../helpers/auth.middleware");
const { getCurrentUser } = require("./user.controller");

const router = Router();
router.get("/current", autorize, asyncWrapper(getCurrentUser));

exports.UserRouter = router;
