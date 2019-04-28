import { elements } from './base';

export const getInput = () => {
    return elements.searchInput.value;
};


export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.resultsList.innerHTML = '';
    elements.searchResultsPages.innerHTML = '';
};

export const highlightSelected = id => {
    // remove all previously added styles
    const resultsArray = Array.from(document.querySelectorAll('results__link'));
    resultsArray.forEach(element => element.classList.remove('results__link--active'));
    // select link element using css selector that has the same element as id in url
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
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
        // reduce used to carry out a callbackfunction on each member of array (forEach), returning single output value
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
    
};

const renderRecipe = (recipe) => {
    const markup = `
    <li>
        <a class="results__link results__link" href="#${recipe.recipe_id}">
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

const createButton = (pageNumber, buttonType) => `
    <button class="btn-inline results__btn--${buttonType}" data-goto=${buttonType === 'prev' ? pageNumber - 1 : pageNumber + 1}>
        <span>Page ${buttonType === 'prev' ? pageNumber - 1 : pageNumber + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${buttonType === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
    `;

const renderButtons = (page, numberOfResults, resultsPerPage) => {
    // round up to next integer
    const pages = Math.ceil(numberOfResults / resultsPerPage);
    
    let button;
    if (page === 1 && pages > 1) {
        // only button to go to next page
        button = createButton(page, 'next');
    } else if (page === pages > 1) {
        // only button to go to previous page
        button = createButton(page, 'prev');
    } else if (page < pages) {
        // button forward && button backward in 1 String
        button = `
        ${createButton(page, 'next')}
        ${createButton(page, 'prev')}
        `;
    }
    elements.searchResultsPages.insertAdjacentHTML('beforeend', button);
}

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;

    // loop through array, automatically passes currentElement to render Recipe
    recipes.slice(start, end).forEach(renderRecipe);

    // reder page buttons
    renderButtons(page, recipes.length, resultsPerPage);

};
