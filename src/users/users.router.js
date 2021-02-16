const { Router } = require("express");
const { getCurrentUser } = require("./users.controller");

const router = Router();
router.get("/current", getCurrentUser);

exports.UsersRouter = router;
