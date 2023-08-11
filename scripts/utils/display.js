export function displayData(recipes) {
    const recipesSection = document.getElementById('gallery-container');
    recipesSection.innerHTML = '';
    
    recipes.map(recipe =>  new Recipe(recipe))
    .forEach((recipe) => {           
        const Template = new RecipeCard(recipe);
        recipesSection.appendChild(Template.getRecipeCardDOM());
    });
}
