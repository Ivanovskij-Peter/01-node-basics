const User = require("../user/User");
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { Conflict } = require("../helpers/errors");
const { avatarGenerate } = require("../helpers/avatar-generator");
const { mail } = require("../helpers/mail");

async function createUser(req, res) {
  const { email, password } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new Conflict("Email in use");
  }
  const avatar = await avatarGenerate();
  const hashedPassword = await bcript.hash(
    password,
    Number(process.env.SALT_ROUNDS)
  );
  const user = await User.create({
    email,
    password: hashedPassword,
    avatarURL: `http://localhost:${process.env.PORT}/images/${avatar}`,
    verificatinToken: uuid.v4(),
  });
  mail.sendEmailForVerification(user);
  res.status(201).send({
    user: {
      email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
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

  await User.findByIdAndUpdate(user.id, { $push: { token: token } });
  res
    .status(201)
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
async function verifyEmail(req, res, next) {
  const { verificatinToken } = req.params;
  const user = await User.findOne({ verificatinToken });
  if (!user) {
    return res.status(404).send("User not found");
  }
  await User.updateOne({ _id: user.id }, { verificatinToken: null });
  res.status(200).send("Veritification was succsesful");
}
module.exports = {
  createUser,
  loginUser,
  logOutUser,
  verifyEmail,
};
