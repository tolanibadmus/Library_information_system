const staffModel = require('../models/staff')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerStaff(req, res){
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  try{
    const existingStaff = await staffModel.findOne({emailAddress: req.body.emailAddress})
    if(existingStaff){
      return res.status(400).json({
        message: 'Email address has already been used',
      }); 
    } else {
      const registerStaff = await staffModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: hashedPassword,
        role: req.body.role
      })
   
      return res.json({
        success: true,
        message: 'Staff registered successfully',
        data: registerStaff,
      })
    }
  } catch(err){
    return res.status(400).json({
      success: false,
      message: 'Unable to register staff',
    });
  }
}

async function staffLogin(req, res) {
  try {
    const registeredStaff = await staffModel.findOne({
      emailAddress: req.body.emailAddress,
    });
    if (registeredStaff) {
      const storedPassword = registeredStaff.password;
      const inputPassword = req.body.password;

      const isMatch = await bcrypt.compare(inputPassword, storedPassword);

      if (isMatch) {
        const jwtSecret = process.env.JWT_SECRET;
        const expirationInHours = '1000h';
        const token = jwt.sign(
          {
            email: registeredStaff.emailAddress,
          },
          jwtSecret,
          {
            expiresIn: expirationInHours,
          },
        );

        return res.json({
          success: true,
          message: 'Staff logged in successfully',
          data: registeredStaff,
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


module.exports = {
  registerStaff,
  staffLogin
}