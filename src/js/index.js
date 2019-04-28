import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import { elements, renderLoader, clearLoader } from './views/base'

const state = {};

/**
 * Search Controller
 */
const controlSearch = async () => {
    // 1. get user input via SearchView
    const query = searchView.getInput();

    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. clean UI and show spinner
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);

        // 4. perform search
        try {
            await state.search.getResults();

            clearLoader();

            // 5. display results in UI (once results have been received)
            searchView.renderResults(state.search.results);
        
        } catch (error) {
            clearLoader();
            alert('Error retrieving recipes');
        }
    }
};

elements.searchButton.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});

elements.searchResultsPages.addEventListener('click', event => {
    /**
     * pagination buttons are not there on page load - so we 
     * have to use what is already there, the results section,
     * together with .closest to get the appro button
     */
    const button = event.target.closest('.btn-inline');
    if (button) {
        const goToPage = parseInt(button.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.results, goToPage);
    }
});

/**
 * Recipe Controller
 */

const controlRecipe = async () => {
    // get id from url
    const id = window.location.hash.replace('#','');

    if (id) {
        // prepare UI for changes TODO
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // create new recipe object and parse ingredients
        state.recipe = new Recipe(id);

        // get recipe data async in background
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // calculate servings and prep time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // clear loader and render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            alert('Error processing recipe');
        }
    }
    
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
