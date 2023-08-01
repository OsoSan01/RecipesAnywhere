const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// app routes

router.get('/', recipeController.homepage);
router.get('/categories', recipeController.exploreCategories); // route for categories index
router.get('/recipe/:id', recipeController.exploreRecipe ); //route for each recipe queried by Id
router.get('/categories/:id', recipeController.exploreCategoriesById ); //route to explore categories by actual type of category
//check later why the hell is not doing the search thing
router.post('/search', recipeController.searchRecipe); // route to search for any given recipe
module.exports = router;