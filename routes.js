const express = require('express');
const router = express.Router();
const userController = require('./controllers/user');
const bookController = require('./controllers/user');
const bookRentalController = require('./controllers/bookRental');
const staffController = require('./controllers/staff');

const validateUser = require('./middlewares/validationMiddleware/userValidation');
const validateStaff = require('./middlewares/validationMiddleware/staffValidation')

//prettier-ignore
router.post('/user/register', validateUser.registerUser, userController.registerUser);
router.post('/user/login', validateUser.loginUser, userController.userLogin);
router.post('/staff/register', validateStaff.registerStaff, staffController.registerStaff)
router.post('/staff/login', validateStaff.loginStaff, staffController.staffLogin)

module.exports = router;
