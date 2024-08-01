const express = require('express');
const router = express.Router();
const userController = require('./controllers/user');
const bookController = require('./controllers/user');
const bookRentalController = require('./controllers/bookRental');
const staffController = require('./controllers/staff');

const validateUser = require('./middlewares/validationMiddleware');

//prettier-ignore
router.post('/user/register', validateUser.registerUser, userController.registerUser);
router.post('/user/login', validateUser.loginUser, userController.userLogin);

module.exports = router;
