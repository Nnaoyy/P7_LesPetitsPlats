import { recipes } from '../../data/recipes.js';
import { displayData } from '../utils/display.js';

const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');

let recipesToDisplay = [...recipes];
let removedRecipes = [];

// fonction qui compte le nombre de recette
function recipesCount() {
	const count = document.getElementById('recipeCount');
	const countRecipes = recipesToDisplay.length;
	count.innerText = countRecipes;
}

// fonction de recherche principale
function principalSearch(searchTerm) {
	const lowercaseSearchTerm = searchTerm.toLowerCase();

	recipesToDisplay = recipes.filter((recipe) => {
		const recipeTitle = recipe.name.toLowerCase();
		const recipeDescription = recipe.description.toLowerCase();
		const recipeIngredients = recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase());

		//on cherche si la recherche est dans le titre ou la description
		const matchesTitleOrDescription =
			recipeTitle.includes(lowercaseSearchTerm) || recipeDescription.includes(lowercaseSearchTerm);

		//on cherche si la recherche est dans les ingrédients
		const matchesIngredient = recipeIngredients.some((ingredient) => ingredient.includes(lowercaseSearchTerm));

		if (matchesTitleOrDescription || matchesIngredient) {
			return true; // si la recherche est dans le titre la description ou les ingrédients on garde la recette
		} else {
			removedRecipes[lowercaseSearchTerm] = removedRecipes[lowercaseSearchTerm] || [];
			removedRecipes[lowercaseSearchTerm].push(recipe);
			return false; // si la recherche n'est pas trouvé on retire la recette de la liste(tableau)
		}
	});
}
// fonctions de recherche sur les ingrédients, les appareils et les ustensiles
function ingredientsSearch(searchTerm) {
	const lowercaseSearchTerm = searchTerm.toLowerCase();

	removedRecipes[searchTerm] = recipesToDisplay.filter((recipe) => {
		const hasIngredient = recipe.ingredients.some((ingredient) =>
			ingredient.ingredient.toLowerCase().includes(lowercaseSearchTerm),
		);
		return !hasIngredient;
	});

	recipesToDisplay = recipesToDisplay.filter((recipe) => {
		return recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(lowercaseSearchTerm));
	});
}

function applianceSearch(searchTerm) {
	const lowercaseSearchTerm = searchTerm.toLowerCase();

	removedRecipes[searchTerm] = recipesToDisplay.filter(({ appliance }) => appliance.toLowerCase() !== lowercaseSearchTerm);

	recipesToDisplay = recipesToDisplay.filter(({ appliance }) => appliance.toLowerCase() === lowercaseSearchTerm);
}

function ustensilsSearch(searchTerm) {
	const lowercaseSearchTerm = searchTerm.toLowerCase();

	removedRecipes[searchTerm] = recipesToDisplay.filter(({ ustensils }) =>
		ustensils.every((utensil) => utensil.toLowerCase() !== lowercaseSearchTerm),
	);

	recipesToDisplay = recipesToDisplay.filter(({ ustensils }) =>
		ustensils.some((utensil) => utensil.toLowerCase() === lowercaseSearchTerm),
	);
}

let searches = [];

export function globalSearch(searchTerm, id) {
	recipesToDisplay = [...recipes];
	removedRecipes = [];
	if (id === 'searchInput') {
		const previousSearchIndex = searches.findIndex((search) => search.inputId === id);
		if (previousSearchIndex !== -1) {
			searches.splice(previousSearchIndex, 1);
		}
	}
	const isExistingSearch = searches.some((search) => search.term === searchTerm);
	if (searchTerm === 'clear') {
		searches = searches.filter((search) => search.inputId !== 'searchInput');
	} else if (searchTerm !== '' && !isExistingSearch) {
		searches.push({ term: searchTerm, inputId: id });
	}

	searches.forEach((search) => {
		switch (search.inputId) {
			case 'searchInput':
				principalSearch(search.term);
				break;
			case 'ingredients':
				ingredientsSearch(search.term);
				break;
			case 'appliance':
				applianceSearch(search.term);
				break;
			case 'ustensils':
				ustensilsSearch(search.term);
				break;
			default:
				break;
		}
	});

	recipesCount(recipesToDisplay);
	displayData(recipesToDisplay);
}

export function removeSearch(searchTerm) {
	if (removedRecipes.hasOwnProperty(searchTerm)) {
		searches = searches.filter((search) => search.term !== searchTerm);
		globalSearch('', null);
	}
}


export function handleSearchInput() {
	const searchTerm = searchInput.value.toLowerCase();

	if (searchInput.value.length === 0) {
		clearSearch.classList.remove('active');
	} else {
		clearSearch.classList.add('active');
	}

	if (searchInput.value.length > 2) {
		globalSearch(searchTerm, 'searchInput');
	} else {
		searches = searches.filter((search) => search.inputId !== 'searchInput');
		globalSearch('clear', 'searchInput');
	}
}


export function handleClearSearch() {
	searches = searches.filter((search) => search.inputId !== 'searchInput');
	searchInput.value = '';
	clearSearch.classList.remove('active');

	const searchTerm = 'searchInput';
	if (removedRecipes.hasOwnProperty(searchTerm)) {
		delete removedRecipes[searchTerm];
	}

	globalSearch('clear', 'searchInput');
}

export function filterList() {
	return recipesToDisplay;
}