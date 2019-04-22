import axios from 'axios';
import { key } from '../config';

export default class Recipe {
    constructor (id) {
        this.id = id;  
    }

    async getRecipe() {
        const getURL = 'https://www.food2fork.com/api/get';

        try {
            const result = await axios(`${getURL}?key=${key}&rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.image = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch (error) {
            alert(error);
        }
    }

    calcTime() {
        // assume 15 min for each 3 ingredients
        const numberOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numberOfIngredients / 3);
        const time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }
}