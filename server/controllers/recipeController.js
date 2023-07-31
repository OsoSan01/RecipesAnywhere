const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

require('../../config/database')


//*get page for homepage
exports.homepage = async (req, res) => {  
    try{
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('index', {title: 'Hungry Bear - Homepage', categories}); //this is how to pass the title and categories object into the template
    } catch (error) {
        res.status(500).send({message: error.message || "Error Ocurred"});
    }
}

// get /categories//
exports.exploreCategories = async (req, res) => {  
    try{
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', {title: 'Hungry Bear - Categories', categories}); //this is how to pass the title and categories object into the template
    } catch (error) {
        res.status(500).send({message: error.message || "Error Ocurred"});
    }
}





// addCategories();
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
