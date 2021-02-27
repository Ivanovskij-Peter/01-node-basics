const jwt = require("jsonwebtoken");
const User = require("../user/User");
const { Unauthorized } = require("./errors");

exports.autorize = async (req, res, next) => {
  try {
    const authHeader = req.get("Autorization") || "";
    const token = authHeader.replace("Bearer", "");
    let value;
    try {
      value = jwt.verify(token, process.env.JWT_SECRET);
      console.log(value);
    } catch (error) {
      throw new Unauthorized("Token is not valid");
    }
    const user = await User.findOne({
      _id: value.userId,
      tokens: token,
    });
    if (!user) {
      throw new Unauthorized("not auntorized");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).send(error.message);
  }
};
