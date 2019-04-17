import { elements } from './base';

export const getInput = () => {
    return elements.searchInput.value;
};

/*
* ' Pasta with tomato and spinach' - default length 17 chars
* 0 / accumulator + currentElement.length = 5 [Pasta]
* 5 / accumulator + currentElement.length = 9 [Pasta, with]
* 9 / accumulator + currentElement.length = 15  [Pasta, with, tomato]
* 15 / accumulator + currentElement.length = 18  [Pasta, with, tomato] ('and' not pushed)
* 15 / accumulator + currentElement.length = 24  [Pasta, with, tomato] ('Spinich' not pushed)
*/
const limitRecipeTitle = (recipeTitle, limit = 17) => {
    const newTitle = [];
    if (recipeTitle.length > limit) {
        // split breaks string into an array based on spaces
        // accumulator passed in as 2nd argument after callback function
        recipeTitle.split(' ').reduce((accumulator, currentElement) => {
            // check size against limit
            if (accumulator + currentElement.length <= limit) {
                // add to array
                newTitle.push(currentElement);
            }
            // update accumulator
            return accumulator + currentElement.length;
        }, 0);
        // joins array together with spaces in between
        return `${newTitle.join(' ')} ...`;
    }
    // titles less than limit are returned in full
    return recipeTitle;
    
}

const renderRecipe = (recipe) => {
    const markup = `
    <li>
        <a class="results__link results__link--active" href="${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.resultsList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (recipes) => {
    // loop through array, automatically passes currentElement to render Recipe
    recipes.forEach(renderRecipe);
};