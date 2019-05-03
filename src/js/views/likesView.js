import { elements } from './base'
import { limitRecipeTitle } from './searchView'

export const toggleLike = (isLiked) => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)
};

export const toggleLikeMenu = (numLikes) => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = (recipe) => {
    const markup = `
    
    <li>
        <a class="likes__link" href="#${recipe.id}">
            <figure class="likes__fig">
                <img src="${recipe.image}" alt="${recipe.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="likes__author">${recipe.author}</p>
            </div>
        </a>
    </li>
    `
    elements.likes.insertAdjacentHTML('beforeend', markup);
};

export const removeLike = id => {
    const item = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
    if (item) item.parentElement.removeChild(item);
};