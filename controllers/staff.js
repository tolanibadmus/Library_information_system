const staffModel = require('../models/staff');
const bookModel = require('../models/book');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

async function registerStaff(req, res) {
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const staff = await staffModel.findOne({
      emailAddress: req.body.emailAddress,
    });
    if (staff) {
      return res.status(400).json({
        message: 'Email address has already been used',
      });
    } else {
      const registerStaff = await staffModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: hashedPassword,
        role: req.body.role,
      });

      return res.json({
        success: true,
        message: 'Staff registered successfully',
        data: registerStaff,
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Unable to register staff',
    });
  }
}

async function staffLogin(req, res) {
  try {
    const staff = await staffModel.findOne({
      emailAddress: req.body.emailAddress,
    });
    if (staff) {
      const storedPassword = staff.password;
      const inputPassword = req.body.password;

      const isMatch = await bcrypt.compare(inputPassword, storedPassword);

      if (isMatch) {
        const jwtSecret = process.env.JWT_SECRET;
        const expirationInHours = '1000h';
        const token = jwt.sign(
          {
            id: staff._id,
            role: staff.role,
            email: staff.emailAddress,
          },
          jwtSecret,
          {
            expiresIn: expirationInHours,
          },
        );

        return res.json({
          success: true,
          message: 'Staff logged in successfully',
          data: staff,
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
        message: 'Staff not found',
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      message: 'Log in failed',
    });
  }
}

async function loadStaff(req, res) {
  try {
    const loadStaff = await staffModel.find();
    return res.json({
      success: true,
      message: 'Staff loaded successfully',
      data: loadStaff,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: 'Unable to load staff',
    });
  }
}

async function deleteStaff(req, res) {
  try {
    const staffId = req.params.id;
    await staffModel.findByIdAndDelete({ _id: staffId });
    return res.json({
      success: true,
      message: 'Staff deleted successfully',
    });
  } catch (err) {
    return res.json({
      success: false,
      message: 'Failed to delete staff',
    });
  }
}

module.exports = {
  registerStaff,
  staffLogin,
  loadStaff,
  deleteStaff,
};
