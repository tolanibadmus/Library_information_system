const { findByIdAndUpdate } = require('../models/book');
const bookModel = require('../models/book');

async function getBooks(req, res) {
  try {
    const getBooks = await bookModel.find({quantity: { $gte: 1 }});
    return res.json({
      success: true,
      message: 'Books loaded successfully',
      data: getBooks,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: 'Fail to load books',
    });
  }
}

async function getBook(req, res) {
  try {
    const bookId = req.params.id;
    const getBook = await bookModel.findById({ _id: bookId });
    return res.json({
      success: true,
      message: 'Book loaded successfully',
      data: getBook,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: 'Fail to load book',
    });
  }
}

async function addBook(req, res) {
  try {
    const addBook = await bookModel.create({
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      description: req.body.description,
      quantity: req.body.quantity,
    });

    return res.json({
      success: true,
      message: 'Book added successfully',
      data: addBook,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: 'Log in failed',
    });
  }
}

async function deleteBook(req, res) {
  const bookId = req.params.id;
  try {
    await bookModel.findByIdAndDelete({ _id: bookId });
    return res.json({
      success: true,
      message: 'Book deleted successfully',
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Failed to delete book',
    });
  }
}

async function updateBook(req, res) {
  try {
    await bookModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        description: req.body.description,
        quantity: req.body.quantity,
        updatedAt: new Date(),
      },
    );
    return res.json({
      success: true,
      message: 'Book updated successfully',
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Failed to update book',
    });
  }
}

module.exports = {
  getBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook,
};
