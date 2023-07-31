const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// app routes

router.get('/', recipeController.homepage);
router.get('/categories', recipeController.exploreCategories) // route for categories index

module.exports = router;