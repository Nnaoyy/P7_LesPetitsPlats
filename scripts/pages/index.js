import { recipes } from '../../data/recipes.js';
import { displayData } from '../utils/display.js';
import { handleSearchInput, handleClearSearch } from '../utils/search.js';
import { generateDropdownList } from '../utils/dropDownList.js';

const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');

searchInput.addEventListener('input', handleSearchInput);

clearSearch.addEventListener('click', handleClearSearch);

generateDropdownList('ingredientsDropdown', 'ingredients-container', 'Ingrédients', 'ingredients');
generateDropdownList('applianceDropdown', 'appliance-container', 'Appareils', 'appliance');
generateDropdownList('ustensilsDropdown', 'ustensils-container', 'Ustensiles', 'ustensils');


const count = document.getElementById('recipeCount');
const countRecipes = recipes.length;
count.innerText = countRecipes;

displayData(recipes);


