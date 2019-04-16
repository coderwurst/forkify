import axios from 'axios';

const key = '2f9b544a5fdeb04bb2dc4373ead448b6';
const searchURL = 'https://www.food2fork.com/api/search';

async function getResults(query) {
    try {
        const result = await axios(`${searchURL}?key=${key}&q=${query}`);
        console.log(result);
    } catch (error) {
        alert(error);
    }
}
getResults('pizza');