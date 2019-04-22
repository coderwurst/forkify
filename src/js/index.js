import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/SearchView'
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
        await state.search.getResults();

        clearLoader();

        // TODO error handling -  check if state.search.results contains response

        // 5. display results in UI (once results have been received)
        searchView.renderResults(state.search.results);

    }
};

elements.searchButton.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});

const search = new Search('pizza');
search.getResults();

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
const test = new Recipe(35382);
test.getRecipe();
console.log(test);