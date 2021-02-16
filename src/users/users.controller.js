const { serializeUser } = require("./users.serialize");

exports.getCurrentUser = (req, res, next) => {
  res.status(200).send(serializeUser(req.user));
};
