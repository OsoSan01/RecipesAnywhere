require('../../config/database')
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');



//*get page for homepage
exports.homepage = async (req, res) => {  
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
exports.exploreCategories = async(req, res) => {
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

exports.exploreRecipe = async(req, res) => {
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        res.render('recipe', { title: 'Hungry bear - Recipe', recipe } );
        } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
        }
  } 


// GET category from ID//
//categories/:id

exports.exploreCategoriesById = async(req, res) => {
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
  exports.searchRecipe = async(req, res) => {
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
exports.submitRecipe = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
  }
  
  /**
   * POST /submit-recipe
   * Submit Recipe
  */
  exports.submitRecipeOnPost = async(req, res) => {
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
        email: req.body.email,
        ingredients: req.body.ingredients,
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
  
  // Delete Recipe
// async function deleteRecipe(){
//   try {
//     await Recipe.deleteOne({ name: 'New Recipe From Form' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteRecipe();


// Update Recipe
// async function updateRecipe(){
//   try {
//     const res = await Recipe.updateOne({ name: 'New Recipe' }, { name: 'New Recipe Updated' });
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }
// updateRecipe();

  



// async function addRecipeData(){ //funciton to add the recipe model into mongoose in the first place
//       try {
//         await Recipe.insertMany([
//           { 
//             "name": "Snapper Ceviche",
//             "description": `This is really simple and fresh recipe, great for summer!`,
//             "ingredients": [
//                 "200g Snapper filet",
//                 "5-6 limes",
//                 "Pink salt",
//                 "1 red onion",
//                 "1 cucumber",
//                 "1 bunch coriander",
//                 "2 green chilli (jalapeno if possible)",
//             ],
//             "equipment": [
//                 "choping board",
//                 "chef knife",
//                 "bowl",
//                 "spoon",
//                 "blender",
//                 "strainer",
//                 ],
//             "instructions": [
//                 "Dice the snapper into .5cm cubes. Add a pinch of salt, mix and keep it in the fridge",
//                 "Take out the chilli seeds with a knife.",
//                 "Get lime juice, coriander, chilli and salt into the blender. Taste the seasoning, has to bee a bit over salty",
//                 "Strain the mix and add it to the fish. Mix it and take it back to the fridge",
//                 "Filet some red onions and slice some cucumber.",
//                 "Mix the veggies with the fish, keep it in the fridge but give it a quick mix from time to time. Will be ready to eat in about 15 min.",
//                 "When ready to serve, add some chopped coriander and mix again, plate it an have some crackers with it."
//             ],
//             "category": "Seafood", 
//             "image": "ceviche.jpg"
//           },
//           { 
//             "name": "Soy Braised Duck",
//             "description": `Japanese style soy braised duck with pickled brussel sprouts`,
//             "ingredients": [
//             "400g red brussel sprouts",
//             "200ml rice wine vinegar",
//             "200ml water",
//             "150ml mirin",
//             "80ml+150ml sake",
//             "85g+50g white sugar",
//             "50ml soy sauce",
//             "2 duck breast",
//             "1 kombu leaf",
//             "5-6 pieces pepper corns",
//             "2 garlic cloves",
//             "Pink salt",
//             "10g ginger",
//             ],
//             "equipment": [
//                 "choping board",
//                 "chef knife",
//                 "bowl",
//                 "spoon",
//                 "sauce pan",
//                 "frying pan",
//                 "whisk",
//                 ],
//             "instructions": [
//                 "Clean the sprouts and slighty open them from the top.",
//                 "On a sauce pan, mix viengar, water, 80ml sake and sugar.",
//                 "Disolve the sugar over medium heat and simmer the mix for a couple of min.",
//                 "Pour the mix over the sprouts and cover the top with clingwrap. Set aside until used",
//                 "On a new sauce pan, get 150ml sake and the mirin, bring it to a quick boil for a couple of min.",
//                 "When the alcohol is evaporated, add sugar and soysauce. Check for seasoning ",
//                 "Diamond score the duck skin. Sear and start rendering the fat over a very hot pan",
//                 "When reaching the desired color, add the duck (skin side down) into the brasing liquid (has to be hot).",
//                 "Add the pepper, garlic, pealed ginger and kombu and bring it to a boil. Give a couple of turns to the duck",
//                 "Cook for around 2min, take out the duck and let it rest for 1 min. Repeat but now having the liquid on simmering",
//                 "Repeat the process around 5-6 times or until the desired term.",
//                 "Strain, dry and cut in halves the sprouts, cook them for aroun 5-6 min inside the liquid.",
//                 "Slice the breast, can be served with rice, some pure or on ramen.",
//             ],
//             "category": "Only-Meats", 
//             "image": "braised-duck.jpg"
//           },
//         ]);
//       } catch (error) {
//         console.log('err', + error)
//       }
//     }
// addRecipeData();




// addCategories(); //function to add the categories. If I need more categories I can add them here. However, so far I will work with the ones I have now
// async function addCategories(){
//   try {
//     await Category.insertMany([
//       {
//         "name": "Thai", name of the category
//         "image": "thai-food.jpg" picture that lives on public/img
//       },
//       add more categories as needed
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }
