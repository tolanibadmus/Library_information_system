const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await userModel.findOne({
      emailAddress: req.body.emailAddress,
    });
    if (existingUser) {
      return res.status(400).json({
        message: 'Email address has already been used',
      });
    } else {
      const registerUser = await userModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: hashedPassword,
      });
      return res.json({
        success: true,
        message: 'User registered successfully',
        data: registerUser,
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Unable to register user',
    });
  }
}


async function userLogin(req, res) {
  try {
    const registeredUser = await userModel.findOne({
      emailAddress: req.body.emailAddress,
    });
    if (registeredUser) {
      const storedPassword = registeredUser.password;
      const inputPassword = req.body.password;

      const isMatch = await bcrypt.compare(inputPassword, storedPassword);

      if (isMatch) {
        const jwtSecret = process.env.JWT_SECRET;
        const expirationInHours = '1000h';
        const token = jwt.sign(
          {
            email: registeredUser.emailAddress,
          },
          jwtSecret,
          {
            expiresIn: expirationInHours,
          },
        );

        return res.json({
          success: true,
          message: 'User logged in successfully',
          data: registeredUser,
          token: token,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Password incorrect',
        });
      }
    } else {
      return res.json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      message: 'Log in failed',
    });
  }
}

module.exports = {
  registerUser,
  userLogin,
};
