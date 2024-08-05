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
const staffAccessMiddleware = require('./middlewares/staffAccess');

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
  [
    authMiddleware,
    staffAccessMiddleware.allStaffCanAccessMiddleware,
    validateBook.addBook,
  ],
  bookController.addBook,
);

//put requests
router.put(
  '/book/:id',
  [authMiddleware, staffAccessMiddleware.allStaffCanAccessMiddleware],
  bookController.updateBook,
);

//get requests
router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBook);
router.get(
  '/users',
  [authMiddleware, staffAccessMiddleware.allStaffCanAccessMiddleware],
  userController.loadUsers,
);

//delete requests
router.delete(
  '/book/:id',
  [authMiddleware, staffAccessMiddleware.allStaffCanAccessMiddleware],
  bookController.deleteBook,
);

module.exports = router;
