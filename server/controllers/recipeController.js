require('../../config/database')
// const { model } = require('mongoose');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');



//*get page for homepage
const homepage = async (req, res) => {  
    try{
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber) //this will show the latest added recipes on the home page with a limit of 5
        //the following ones const will wrap each category to be finded by id and limit the result to 5 elements
        const onlyMeats = await Recipe.find({'category': 'Only-Meats'}).limit(limitNumber); 
        const mexican = await Recipe.find({'category': 'Mexican-Touch'}).limit(limitNumber);
        const veggies = await Recipe.find({'category': 'Only-Veggies'}).limit(limitNumber);
        const seafood = await Recipe.find({'category': 'Seafood'}).limit(limitNumber);
        const sweet = await Recipe.find({'category': 'Sweets'}).limit(limitNumber);
        const spanish = await Recipe.find({'category': 'Spanish'}).limit(limitNumber);

        //this whole const of food can be reused to check all categories
        const food = {latest, onlyMeats, mexican, veggies, seafood, sweet, spanish};

        res.render('index', {title: 'Hungry Bear - Homepage', categories, food}); //this is how to pass the title and categories object into the template
    } catch (error) {
        res.status(500).send({message: error.message || "Error Ocurred"});
    }
}

// get /categories//
const exploreCategories = async(req, res) => {
    try {
      const limitNumber = 20;
      const categories = await Category.find({}).limit(limitNumber);
      res.render('categories', { title: 'Hungry Bear - Categories', categories } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 

// GET recipe from ID//
//recipe/:id

const exploreRecipe = async (req, res) => {
    try {
      let recipeId = req.params.id;
      const recipe = await Recipe.findById(recipeId);
      res.render('recipe', { title: 'Hungry bear - Recipe', recipe });
    } catch (error) {
      res.status(500).send({ message: error.message || "Error Occured" });
    }
  }


// GET category from ID//
//categories/:id

const exploreCategoriesById = async(req, res) => {
    try {
        let categoryId = req.params.id;
        const limitNumber = 20;
        // this will look for each recipe on a certain category and show them
        const categoryById = await Recipe.find({ 'category': categoryId}).limit(limitNumber);
        res.render('categories', { title: 'Hungry bear - Categories', categoryById } );
        } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
        }
  } 


  //POST search for a recipe by name/id
  // /search
  const searchRecipe = async(req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
      res.render('search', { title: 'Hungry bear - Search', recipe } );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  }

  /**
 * GET /submit-recipe
 * Submit Recipe
*/
const submitRecipe = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
  }
  
  /**
   * POST /submit-recipe
   * Submit Recipe
  */
  const submitRecipeOnPost = async(req, res) => {
    try {
  
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        })
  
      }
  
      const newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        equipment: req.body.equipment,
        instructions: req.body.instructions,
        category: req.body.category,
        image: newImageName
      });
      
      await newRecipe.save();
  
      req.flash('infoSubmit', 'Recipe has been added.')
      res.redirect('/submit-recipe');
    } catch (error) {
      // res.json(error);
      req.flash('infoErrors', error);
      res.redirect('/submit-recipe');
    }
  }
  
    
  async function deleteRecipeById(req, res) {
    try {
      const recipeId = req.params.id;
      // Find the recipe by ID and delete it
      const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
      if (deletedRecipe) {
        console.log('Recipe deleted successfully:', deletedRecipe);
        res.redirect('/categories'); // Redirect to a page after successful deletion
      } else {
        console.log('Recipe not found for deletion.');
        res.redirect('/categories'); // Redirect to a page if the recipe is not found
      }
    } catch (error) {
      console.error('Error occurred while deleting the recipe:', error);
      res.redirect('/recipe/' + recipeId); // Redirect to the recipe page on error
    }
  }

//render the update recipe page
async function renderUpdateRecipePage(req, res) {
    try {
      const recipeId = req.params.id;
      // Find the recipe by ID
      const recipe = await Recipe.findById(recipeId);
      if (recipe) {
        res.render('updateRecipe', { title: 'Update Recipe', recipe });
      } else {
        console.log('Recipe not found for update.');
        res.redirect('/categories'); // Redirect to a page if the recipe is not found
      }
    } catch (error) {
      console.error('Error occurred while fetching the recipe:', error);
      res.redirect('/categories'); // Redirect to a page in case of an error
    }
  }

  //allows to update and post the new updated recipe
async function updateRecipeById(req, res) {
    try {
      const recipeId = req.params.id;
      // Find the recipe by ID and update its properties
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipeId,
        {
          name: req.body.name,
          description: req.body.description,
          ingredients: req.body.ingredients,
          equipment: req.body.equipment,
          instructions: req.body.instructions,
          category: req.body.category,
        },
        { new: true } // Set { new: true } to return the updated document
      );
      if (updatedRecipe) {
        console.log('Recipe updated successfully:', updatedRecipe);
        res.redirect(`/recipe/${recipeId}`); // Redirect to the updated recipe page
      } else {
        console.log('Recipe not found for update.');
        res.redirect('/categories'); // Redirect to a page if the recipe is not found
      }
    } catch (error) {
      console.error('Error occurred while updating the recipe:', error);
      res.redirect(`/update-recipe/${recipeId}`); // Redirect to the update recipe page on error
    }
  }
  

  module.exports = {
    homepage,
    exploreCategories,
    exploreRecipe,
    exploreCategoriesById,
    searchRecipe,
    submitRecipe,
    submitRecipeOnPost,
    deleteRecipeById,
    renderUpdateRecipePage,
    updateRecipeById
}
