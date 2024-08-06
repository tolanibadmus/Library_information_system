const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

staffSchema.methods.toJSON = function () {
  const staff = this.toObject();
  delete staff.password;
  return staff;
};

module.exports = mongoose.model('Staff', staffSchema);
