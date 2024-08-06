const mongoose = require('mongoose');
const bookRentalModel = require('../models/bookRental');
const bookModel = require('../models/book');
const userModel = require('../models/user');
const { ObjectId } = mongoose.Types;

async function borrowBook(req, res) {
  try {
    const currentUser = req.decoded;
    const userId = currentUser.id;
    const bookId = req.params.id;
    const book = await bookModel.findById(bookId);
    const bookQuantity = parseInt(book.quantity);
    if (bookQuantity === 0) {
      return res.json({
        success: false,
        message: 'Book not available',
      });
    }
    const newBookQuantity = bookQuantity - 1;
    const borrowBook = await bookRentalModel.create({
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
      data: borrowBook,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: 'Cannot borrow book',
    });
  }
}

async function staffGetBorrowedBooks(req, res) {
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
    console.log(err);
    return res.status(400).json({
      success: false,
      message: 'Unable to get borrowed books',
    });
  }
}
module.exports = {
  borrowBook,
  staffGetBorrowedBooks,
};
