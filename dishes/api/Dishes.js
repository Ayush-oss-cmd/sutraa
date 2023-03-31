const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Dish', dishSchema);