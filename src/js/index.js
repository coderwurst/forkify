import Search from './models/Search'

const state = {};

const controlSearch = async () => {
    // 1. get user input via SearchView
    const query = 'pizza';      // TODO
    
    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. show loading spinner
        // TODO

        // 4. perform search
        await state.search.getResults();

        // 5 display results in UI (once results have been received)
        console.log(state.search.results);
    }
};

document.querySelector('.search').addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});

const search = new Search('pizza');
search.getResults();