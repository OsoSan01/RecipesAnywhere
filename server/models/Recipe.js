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