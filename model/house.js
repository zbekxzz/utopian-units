const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  houseName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  pricePerNight: {
    type: Number,
    required: true
  },
  facilities: {
    type: [String],
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  view: {
    type: String,
    required: true
  },
  houseRules: {
    type: [String],
    required: true
  }
});

const House = mongoose.model('House', houseSchema);
module.exports = House;
