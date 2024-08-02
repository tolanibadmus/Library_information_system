const express = require('express');
const router = express.Router();
const userController = require('./controllers/user');
const bookController = require('./controllers/book');
const bookRentalController = require('./controllers/bookRental');
const staffController = require('./controllers/staff');

const validateUser = require('./middlewares/validationMiddleware/userValidation');
const validateStaff = require('./middlewares/validationMiddleware/staffValidation');
const validateBook = require('./middlewares/validationMiddleware/bookValidation');
const authMiddleware = require('./middlewares/authMiddleware');


// post requests
//prettier-ignore
router.post('/user/register', validateUser.registerUser, userController.registerUser);
router.post('/user/login', validateUser.loginUser, userController.userLogin);
router.post(
  '/staff/register',
  validateStaff.registerStaff,
  staffController.registerStaff,
);
router.post(
  '/staff/login',
  validateStaff.loginStaff,
  staffController.staffLogin,
);
router.post(
  '/books',
  [authMiddleware, validateBook.addBook],
  bookController.addBook,
);




//get requests
router.get('/books', bookController.getBooks)
router.get('/books/:id', bookController.getBook)






module.exports = router;
