const bookModel = require('../models/book')

async function getBooks(req, res){
  try{
    const getBooks = await bookModel.find()
    return res.json({
      success: true,
      message: 'Books loaded successfully',
      data: getBooks
    })
  } catch(err){
    return res.json({
      success: false,
      message: 'Fail to load books',
    });
  }
}


async function getBook(req, res){
  try {
    const bookId = req.params.id
    const getBook = await bookModel.findById({_id: bookId})
    return res.json({
      success: true,
      message: 'Book loaded successfully',
      data: getBook
  })
  } catch(err){
    return res.json({
      success: false,
      message: 'Fail to load book',
    });
  }
}


async function addBook(req, res){
  try{
    const addBook = await bookModel.create({
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      description: req.body.description,
      quantity: req.body.quantity,
    })

    return res.json({
      success: true,
      message: 'Book added successfully',
      data: addBook,
    })
  } catch(err){
      return res.json({
        success: false,
        message: 'Log in failed',
      });
  }
  
}



module.exports = {
  getBooks,
  getBook,
  addBook
}