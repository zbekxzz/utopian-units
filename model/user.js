const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      required: true,
      default: "User"
    },
    email: {
      type: String,
      required: true
    },
    fullName: {
      type: String
    },
    phone: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    cardNumber: {
      type: String,
      default: "0"
    }
});

const user = new mongoose.model('User', userSchema);
module.exports = user;