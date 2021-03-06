export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchButton: document.querySelector('.search'),
    resultsList: document.querySelector('.results__list'),
    searchResults: document.querySelector('.results'),
    recipeArea: document.querySelector('.recipe'),
    searchResultsPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likes: document.querySelector('.likes__list'),
    likesMenu: document.querySelector('.likes__field')
};

export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}