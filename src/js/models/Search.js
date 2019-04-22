import axios from 'axios';
import { key } from '../config';

export default class Search {
    constructor (query) {
        this.query = query;  
    }

    async getResults() {
        const searchURL = 'https://www.food2fork.com/api/search';

        try {
            const result = await axios(`${searchURL}?key=${key}&q=${this.query}`);
            this.results = result.data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}