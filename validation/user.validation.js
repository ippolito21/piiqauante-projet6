const Joi = require("joi");

function validateUser(user) {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
  });
  return userSchema.validate(user);
}

module.exports = validateUser;
