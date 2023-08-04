import { recipes } from '../../data/recipes.js';


function displayData(recipes) {
    const recipesSection = document.getElementById('gallery-container');
    
    recipes.map(recipe =>  new Recipe(recipe))
    .forEach((recipe) => {           
        const Template = new RecipeCard(recipe);
        recipesSection.appendChild(Template.getRecipeCardDOM());
    });
}

displayData(recipes);


