import Search from './models/Search'
import * as searchView from './views/SearchView'
import { elements } from './views/base'

const state = {};

const controlSearch = async () => {
    // 1. get user input via SearchView
    const query = searchView.getInput();
    
    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. show loading spinner
        // TODO

        // 4. perform search
        await state.search.getResults();

        // 5 display results in UI (once results have been received)
        searchView.renderResults(state.search.results);
    }
};

elements.searchButton.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});

const search = new Search('pizza');
search.getResults();