// event handler for the ingredients, equiptment and instructions buttons.
//They alound to add one more element on the screen
let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];
let addEquipmentBtn = document.getElementById('addEquipmentBtn');
let equipmentList = document.querySelector('.equipmentList');
let equipmentDiv = document.querySelectorAll('.equipmentDiv')[0];
let addInstructionstBtn = document.getElementById('addInstructionstBtn');
let instructionsList = document.querySelector('.instructionsList');
let instructionsDiv = document.querySelectorAll('.instructionsDiv')[0];

addIngredientsBtn.addEventListener('click', function(){
    let newIngredients = ingredeintDiv.cloneNode(true);
    let input = newIngredients.getElementsByTagName('input')[0];
    input.value = '';
    ingredientList.appendChild(newIngredients);
  });


addEquipmentBtn.addEventListener('click', function() {
    let newIngredients = equipmentDiv.cloneNode(true);
    let input = newIngredients.getElementsByTagName('input')[0];
    input.value = '';
    equipmentList.appendChild(newIngredients);
})

addInstructionstBtn.addEventListener('click', function() {
    let newInstructions = instructionsDiv.cloneNode(true);
    let input = newInstructions.getElementsByTagName('input')[0];
    input.value = '';
    instructionsList.appendChild(newInstructions);
})



