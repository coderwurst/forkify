import axios from 'axios';

export default class Search {
    constructor (query) {
        this.query = query;  
    }

    async getResults() {
        const key = '2f9b544a5fdeb04bb2dc4373ead448b6';
        const searchURL = 'https://www.food2fork.com/api/search';

        try {
            const result = await axios(`${searchURL}?key=${key}&q=${this.query}`);
            console.log(result);
            this.results = result.data.recipes;
            console.log(this.results);
        } catch (error) {
            alert(error);
        }
    }
}