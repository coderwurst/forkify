import { elements } from './base'

export const toggleLike = (isLiked) => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outline';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)
};

export const renderLike = () => {
    /*
                        <li>
                            <a class="likes__link" href="#23456">
                                <figure class="likes__fig">
                                    <img src="img/test-1.jpg" alt="Test">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">Pasta with Tomato ...</h4>
                                    <p class="likes__author">The Pioneer Woman</p>
                                </div>
                            </a>
                        </li>
                       */
};

export const removeLike = () => {

};