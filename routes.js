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
router.post(
  '/books/:id/borrow',
  [authMiddleware],
  bookRentalController.borrowBook,
);

//put requests
router.put(
  '/books/:id',
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
router.get('/staff', [
  authMiddleware,
  staffAccessMiddleware.superAdminMiddleware,
  staffController.loadStaff,
]);

router.get(
  '/user/borrowed',
  [authMiddleware],
  bookRentalController.borrowedBooksForAUser,
);

router.get(
  '/borrowed',
  [authMiddleware, staffAccessMiddleware.allStaffCanAccessMiddleware],
  bookRentalController.getAllBorrowedBooks,
);

//delete requests
router.delete(
  '/books/:id',
  [authMiddleware, staffAccessMiddleware.allStaffCanAccessMiddleware],
  bookController.deleteBook,
);
router.delete('/staff/:id', [
  authMiddleware,
  staffAccessMiddleware.superAdminMiddleware,
  staffController.deleteStaff,
]);

module.exports = router;
