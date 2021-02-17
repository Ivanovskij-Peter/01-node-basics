const { serializeUser } = require("./user.serialize");

exports.getCurrentUser = (req, res, next) => {
  res.status(200).send(serializeUser(req.user));
};
