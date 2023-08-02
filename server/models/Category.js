const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: 'This field is required.'
    },
    image: {
      type: String,
      required: 'This field is required.'
    },
  });

module.exports = mongoose.model('Category', categorySchema)









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
