const joi = require('joi');

const registerSchema = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  emailAddress: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi
    .string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .min(3)
    .max(10)
    .required(),
  role: joi.string().required(),
});

const registerStaff = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

const loginSchema = joi.object().keys({
  emailAddress: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi
    .string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .min(3)
    .max(10)
    .required(),
});

const loginStaff = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = {
  registerStaff,
  loginStaff,
};
