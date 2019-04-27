import axios from 'axios';
import { key, cors } from '../config';

export default class Recipe {
    constructor (id) {
        this.id = id;  
    }

    async getRecipe() {
        const getURL = 'https://www.food2fork.com/api/get';

        try {
            const result = await axios(`${cors}${getURL}?key=${key}&rId=${this.id}`);
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
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        
        const newIngredients = this.ingredients.map(element => {
            // 1. uniform units
            let ingredient = element.toLowerCase();
            unitsLong.forEach((currentUnit, i) => {
                ingredient = ingredient.replace(currentUnit, unitsShort[i]);
            });

            // 2. remove (contents and brackets)
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3. parse ingredients into count, unit and ingredient
            // split ingredient into words
            const arrayIngredient = ingredient.split(' ');
            const unitIndex = arrayIngredient.findIndex(arrayElement => units.includes(arrayElement));

            let objectIngredient;
            if (unitIndex > -1) {
                // is unit
                const arrayCount = arrayIngredient.slice(0, unitIndex);
                
                let count;
                if (arrayCount.length === 1) {
                    // example 4 cups === arrayCount 4
                    count = eval(arrayIngredient[0].replace('-', '+'));
                } else {                
                    // example 4 1/2 cups === arrayCount 4 1/2 -> eval("4+1/2") === 4.5
                    count = eval(arrayIngredient.slice(0, unitIndex).join('+'));
                }

                objectIngredient = {
                    count: count,
                    unit: arrayIngredient[unitIndex],
                    ingredient: arrayIngredient.slice(unitIndex +1).join(' ')
                }

            } else if(parseInt(arrayIngredient[0], 10)) {
                // no unit, but 1st element is a number - count 1st element in array, no unit and ingredient includes entire array except 1st element
                objectIngredient = {
                    count: parseInt(arrayIngredient[0], 10),
                    unit: '',
                    ingredient: arrayIngredient.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // no unit and no number in 1st position - always count 1, unit empty and ingredient used directly
                objectIngredient = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            // 4. map function saves returned element to new array
            return objectIngredient;

        });

        this.ingredients = newIngredients;
    }
}