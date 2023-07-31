const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  description: {
    type: String,
    required: 'This field is required.'
  },
  ingredients: {
    type: Array,
    required: 'This field is required.'
  },
  equipment: {
    type: Array,
    required: 'This field is required.'
  },
  instructions: {
    type: Array,
    required: 'This field is required.'
  },
  category: {
    type: String,
    enum: ['Only Meats', 'Mexican Touch', 'Only Veggies', 'Sea Food', 'Sweet Tooth', 'Spanish'],
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
});

module.exports = mongoose.model('Recipe', recipeSchema)