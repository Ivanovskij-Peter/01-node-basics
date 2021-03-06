const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string(),
});
exports.updateUserSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string(),
  subscription: Joi.string(),
  token: Joi.string(),
});
exports.validateIdSchema = Joi.object({
  contactId: Joi.objectId(),
});
exports.UserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
