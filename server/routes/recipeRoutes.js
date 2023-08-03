const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
// const upload = require('../../utils/multer') come back to cloudinary later

// app routes
router.get('/', recipeController.homepage);
router.get('/categories', ensureLoggedIn, recipeController.exploreCategories); // route for categories index
router.get('/recipe/:id', ensureLoggedIn, recipeController.exploreRecipe ); //route for each recipe queried by Id
router.get('/categories/:id', ensureLoggedIn, recipeController.exploreCategoriesById ); //route to explore categories by actual type of category
router.post('/search', ensureLoggedIn, recipeController.searchRecipe); // route to search for any given recipe
router.get('/submit-recipe', ensureLoggedIn, recipeController.submitRecipe); //route for the submit recipe form
router.post('/submit-recipe', ensureLoggedIn, recipeController.submitRecipeOnPost); //posting the new recipe 
router.delete('/recipe/:id', ensureLoggedIn, recipeController.deleteRecipeById);//deletes a recipe based on its id
router.get('/update-recipe/:id', ensureLoggedIn, recipeController.renderUpdateRecipePage); //route for the update recipe form based on id
router.post('/recipe/:id', ensureLoggedIn, recipeController.updateRecipeById); //posting the new recipe 



module.exports = router;