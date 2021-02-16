const User = require("./User");
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Conflict } = require("../helpers/errors");

async function createUser(req, res) {
  const { email, password } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new Conflict("Email in use");
  }
  const hashedPassword = await bcript.hash(
    password,
    Number(process.env.SALT_ROUNDS)
  );
  const user = await User.create({
    email,
    hashedPassword,
  });
  res.status(201).send({ user: { email, subscription: user.subscription } });
}
async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return res.status(401).send("Authentification is failed");
  }
  const isPasswordValid = await bcript.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Authentification is failed");
  }
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET
  );
  res
    .status(200)
    .send({ token, user: { email, subscription: user.subscription } });
}

async function logOutUser(req, res) {
  const { user, token } = req;
  await User.updateOne(
    { _id: user._id },
    {
      $pull: { tokens: token },
    }
  );
  res.status(204).send();
}
module.exports = {
  createUser,
  loginUser,
  logOutUser,
};
