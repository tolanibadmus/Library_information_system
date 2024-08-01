const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookRentalSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  bookId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  borrowedAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  returnedAt: {
    type: Date,
    default: new Date()
  }

})

module.exports = mongoose.model('BookRental', bookRentalSchema)