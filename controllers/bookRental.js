const mongoose = require('mongoose');
const bookRentalModel = require('../models/bookRental');
const bookModel = require('../models/book');
const { ObjectId } = mongoose.Types;

async function borrowBook(req, res) {
  try {
    const currentUser = req.decoded;
    const userId = currentUser.id;
    const bookId = req.params.id;
    const book = await bookModel.findById(bookId);
    if (!book || book.quantity === 0) {
      return res.json({
        success: false,
        message: 'Book not available',
      });
    }
    const newBookQuantity = book.quantity - 1;

    const userAlreadyBorrowedBook = await bookRentalModel.findOne({
      userId: new ObjectId(userId),
      bookId: new ObjectId(bookId),
      returnedAt: { $exists: false },
    });

    if (userAlreadyBorrowedBook) {
      return res.json({
        success: false,
        message: 'User already borrowed this book.',
      });
    }
    const bookRental = await bookRentalModel.create({
      userId: new ObjectId(userId),
      bookId: new ObjectId(bookId),
    });
    await bookModel.findOneAndUpdate(
      {
        _id: bookId,
      },
      {
        quantity: newBookQuantity,
        updatedAt: new Date(),
      },
    );
    return res.json({
      success: true,
      message: 'Book borrowed successfully',
      data: bookRental,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Cannot borrow book',
    });
  }
}

async function returnBorrowedBook(req, res) {
  try {
    const bookId = req.params.id;
    const book = await bookModel.findById(bookId);
    const currentUser = req.decoded;
    const userId = currentUser.id;

    const bookRental = await bookRentalModel.findOne({
      bookId: bookId,
      userId: userId,
      returnedAt: { $exists: false },
    });

    if (!bookRental) {
      return res.status(400).json({
        success: false,
        message: 'No record of user borrowing book or book already returned.',
      });
    }

    const newBookQuantity = book.quantity + 1;

    await bookRentalModel.findOneAndUpdate(
      {
        bookId: bookId,
        userId: userId,
        returnedAt: { $exists: false },
      },
      {
        returnedAt: new Date(),
      },
    );
    await bookModel.findOneAndUpdate(
      {
        _id: bookId,
      },
      {
        quantity: newBookQuantity,
        updatedAt: new Date(),
      },
    );
    return res.json({
      success: true,
      message: 'Book returned successfully',
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Cannot return book',
    });
  }
}

async function borrowedBooksForAUser(req, res) {
  try {
    const currentUser = req.decoded;
    const userId = currentUser.id;
    const borrowedBooks = await bookRentalModel.aggregate([
      {
        $match: { userId: new ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'book',
        },
      },
      {
        $set: {
          user: { $arrayElemAt: ['$user', 0] },
        },
      },
      {
        $set: {
          book: { $arrayElemAt: ['$book', 0] },
        },
      },
      {
        $project: {
          'user.password': false,
        },
      },
    ]);
    return res.json({
      success: true,
      message: 'Borrowed books loaded successfully',
      data: borrowedBooks,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Unable to get borrowed books',
    });
  }
}

async function getAllBorrowedBooks(req, res) {
  try {
    const borrowedBooks = await bookRentalModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'book',
        },
      },
      {
        $set: {
          user: { $arrayElemAt: ['$user', 0] },
        },
      },
      {
        $set: {
          book: { $arrayElemAt: ['$book', 0] },
        },
      },
      {
        $project: {
          'user.password': false,
        },
      },
    ]);
    return res.json({
      success: true,
      message: 'Borrowed books loaded successfully',
      data: borrowedBooks,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Unable to get borrowed books',
    });
  }
}
module.exports = {
  borrowBook,
  returnBorrowedBook,
  borrowedBooksForAUser,
  getAllBorrowedBooks,
};
