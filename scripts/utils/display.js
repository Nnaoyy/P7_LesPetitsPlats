export function displayData(recipes) {
    const searchInput = document.getElementById('searchInput');
    const recipesSection = document.getElementById('gallery-container');
    recipesSection.innerHTML = '';
    
    if (recipes.length === 0) {
		const notFound = document.createElement('p');
		notFound.className = 'notFound';

		notFound.innerText =
			"Aucune recette ne contient '" + searchInput.value + "' vous pouvez chercher 'tarte aux pommes', 'poisson', etc.";

        recipesSection.appendChild(notFound);
	} else {
        recipes.map(recipe =>  new Recipe(recipe))
        .forEach((recipe) => {           
            const Template = new RecipeCard(recipe);
            recipesSection.appendChild(Template.getRecipeCardDOM());
        });
    }
}
