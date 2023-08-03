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
    enum: ['Only-Meats', 'Mexican-Touch', 'Only-Veggies', 'Seafood', 'Sweets', 'Spanish'],
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
});

recipeSchema.index({ name: 'text', description: 'text' });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);


