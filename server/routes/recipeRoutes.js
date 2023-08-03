const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
// const upload = require('../../utils/multer')

// app routes

router.get('/', recipeController.homepage);
router.get('/categories', ensureLoggedIn, recipeController.exploreCategories); // route for categories index
router.get('/recipe/:id', ensureLoggedIn, recipeController.exploreRecipe ); //route for each recipe queried by Id
router.get('/categories/:id', ensureLoggedIn, recipeController.exploreCategoriesById ); //route to explore categories by actual type of category
//check later why the hell is not doing the search thing
router.post('/search', ensureLoggedIn, recipeController.searchRecipe); // route to search for any given recipe
router.get('/submit-recipe', ensureLoggedIn, recipeController.submitRecipe);
router.post('/submit-recipe', ensureLoggedIn, recipeController.submitRecipeOnPost); //just changed to upload image

router.delete('/recipe/:id', ensureLoggedIn, recipeController.deleteRecipeById);

router.get('/update-recipe/:id', ensureLoggedIn, recipeController.renderUpdateRecipePage);
router.post('/recipe/:id', ensureLoggedIn, recipeController.updateRecipeById);

// router.post('/explore-random', recipeController.showRandom ); come back later to add api of random recipe

module.exports = router;