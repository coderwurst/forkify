import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'
import Likes from './models/Likes'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likesView from './views/likesView'
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

        // highlight selected search item (if search has taken place)
        if (state.search) {
            searchView.highlightSelected(id);
        }
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
            recipeView.renderRecipe(
                state.recipe, 
                state.likes.isLiked(id)
            );

        } catch (error) {
            alert('Error processing recipe');
        }
    }
    
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// handle delete and update item events
elements.shopping.addEventListener('click', event => {
    // handle delete
    const id = event.target.closest('.shopping__item').dataset.itemid;
    if (event.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete from state
        state.list.deleteItem(id);
        // delete from ui
        listView.deleteItem(id);
    } else if (event.target.matches('.shopping__count.value')) {
        // handle count update in state
        const value = parseFloat(event.target.value, 10);
        state.list.updateCount(id, value);
    }
});

/**
 * List Controller
 */

const controlList = () => {
    // create new list, if none already there
    if (!state.list) {
        state.list = new List();
    } 
    // add each ingredient to list
    state.recipe.ingredients.forEach(element =>  {
        const item = state.list.addItem(element.count, element.unit, element.ingredient);
        listView.renderItem(item);
    });
}

// testing before persistance
state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumberLikes);

/**
* Likes Controller
*/
const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    
    const currentId = state.recipe.id;
    // user has not liked current recipe
    if(!state.likes.isLiked(currentId)) {
        // add to state
        const newLike = state.likes.addLike(
            state.recipe.id, 
            state.recipe.title,
            state.recipe.author,
            state.recipe.image
        )

        // toggle like button to solid
        likesView.toggleLike(true);

        // add recipe to likes list
        likesView.renderLike(newLike);

    } else {
        // user has liked recipe

        // remove to state
        state.likes.deleteLike(currentId);

        // toggle like button to outline
        likesView.toggleLike(false);

        // remove recipe to likes list
        likesView.removeLike(currentId);
    }

    likesView.toggleLikeMenu(state.likes.getNumberLikes());
}


// handling recipe button clicks
elements.recipe.addEventListener('click', event => {
    // decrease button is clicked
    if(event.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if(event.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // add to shopping basket is clicked
        controlList();
    } else if (event.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});



