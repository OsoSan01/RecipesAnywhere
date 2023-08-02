const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
// const ensureLoggedIn = require('../config/ensureLoggedIn');

// app routes

router.get('/', recipeController.homepage);
router.get('/categories', recipeController.exploreCategories); // route for categories index
router.get('/recipe/:id', recipeController.exploreRecipe ); //route for each recipe queried by Id
router.get('/categories/:id', recipeController.exploreCategoriesById ); //route to explore categories by actual type of category
//check later why the hell is not doing the search thing
router.post('/search', recipeController.searchRecipe); // route to search for any given recipe
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);

router.delete('/recipe/:id', recipeController.deleteRecipeById);

router.get('/update-recipe/:id', recipeController.renderUpdateRecipePage);
router.post('/recipe/:id', recipeController.updateRecipeById);

// router.post('/explore-random', recipeController.showRandom ); come back later to add api of random recipe

module.exports = router;