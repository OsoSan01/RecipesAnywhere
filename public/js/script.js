// here is to add more elements into ingredientes and equipment
let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];
let addEquipmentBtn = document.getElementById('addEquipmentBtn');
let equipmentList = document.querySelector('.equipmentList');
let equipmentDiv = document.querySelectorAll('.equipmentDiv')[0];

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