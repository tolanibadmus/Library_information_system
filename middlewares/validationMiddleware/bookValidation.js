const joi = require('joi');

const registerSchema = joi.object().keys({
  title: joi.string().required(),
  author: joi.string().required(),
  category: joi.string().required(),
  description: joi.string(),
  quantity: joi.number().required(),
});

const addBook = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};


module.exports = {
  addBook
}