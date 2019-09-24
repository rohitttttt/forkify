import axios from 'axios';
import { localRecipesFood2Fork, localRecipesTheMealDb } from '../local-recipes';
import { apiConfig } from '../config';

export default class Search {

    constructor(query) {
        this.query = query;
    }

    async getRecipesAsync() {

        // TheMealDB.com API

        try {

            // throw new Error('test error');

            const response = await axios
                .get(`${apiConfig.url.theMealDb}${apiConfig.key.theMealDb}/filter.php?c=${this.query}`);


            // convert to standard recipe object.
            /*
recipe_id: '100',
    title: 'Farm House Pizza Dough',
    image_url: './img/test-1.jpg',
    publisher: 'Jungle',
    source_url: './img/test-1.jpg',
    ingredients
            */

            if (response && response.data && response.data.meals) {
                this.result = this.formatRecipes(response.data);
            }

        }
        catch (error) {
            // throw error;
            console.error(error);

            // Get Recipes from Local store.
            this.result = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(this.formatRecipes(localRecipesTheMealDb));
                }, 3000);
            });

        }
    }

    formatRecipes(data) {
        let recipes = [];
        data.meals.forEach(value => {
            let recipe = {
                recipe_id: value.idMeal,
                title: value.strMeal,
                image_url: value.strMealThumb,
                publisher: value.idMeal
            };
            recipes.push(recipe);
        });
        return recipes;
    }
    // async getRecipesAsync() {

    // // FoodToFork.com API.

    //     try {

    //         const response = await axios.get(`${apiConfig.url.foodToFork}search?key=${apiConfig.key.foodToFork}&query=${this.query}`);

    //         this.result = response.data.recipes;

    //     }
    //     catch (error) {
    //         // throw error;
    //         console.log(error);

    //         // Get Recipes from Local store.
    //         this.result = await new Promise((resolve) => {
    //             setTimeout(() => {
    //                 resolve(localRecipesFood2Fork);
    //             }, 3000);
    //         });

    //     }
    // }

    // getLocalRecipes(resolve) {

    //     setTimeout(() => {
    //         resolve(localRecipes);
    //     }, 3000);
    // }

}