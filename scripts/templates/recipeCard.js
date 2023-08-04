class RecipeCard {
    constructor(recipe) {
        this._recipe = recipe;
    }

    
    getRecipeCardDOM(){
        const article = document.createElement('article');
		article.className = 'recipe-article';

        const recipe = this._recipe;
        const recipeCard = `
        <img src="${recipe._picture}" alt="${recipe._name}" class="recipe-image">
		<div class="recipe-card">
		  <h3 class="recipe-title">${recipe._name}</h3>
		  <h4 class="entitled1">recette</h4>
		  <p class="recipe-description">${recipe._description}</p>
		  <h4 class="entitled2">ingrédients</h4>
		  <div class="ingredient-grid">
			${recipe._ingredients
				.map(
					(ingredient) => `
				<div class="ingredient">
				  <h5>${ingredient.ingredient}</h5>
				  <p>${
						ingredient.quantity && ingredient.unit
							? `${ingredient.quantity} ${ingredient.unit}`
							: ingredient.quantity || ''
					}</p>
				</div>
			  `,
				)
				.join('')}
		  </div>
		</div>
		<div class="time">${recipe._time}min</div>
	  `;

        article.innerHTML = recipeCard;
        return article;
    }

}