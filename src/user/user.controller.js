const User = require("./User");
const { serializeUser } = require("./user.serialize");

exports.getCurrentUser = (req, res, next) => {
  res.status(200).send(serializeUser(req.user));
};
exports.updateUserAvatar = async (req, res, next) => {
  const avatarURL = `http://localhost:${process.env.PORT}/images/${req.file.filename}`;
  await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });
  return res.status(204).send({ user: { avatarURL: user.avatarURL } });
};
