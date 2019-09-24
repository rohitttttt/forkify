import axios from 'axios';
import { localRecipesTheMealDb } from '../local-recipes';
import { apiConfig } from '../config';

export default class Recipe {

    constructor(recipeId) {
        this.recipeId = recipeId;
    }

    async getRecipeAsync() {

        try {

            // https://www.themealdb.com/api/json/v1/1/lookup.php?i=52807
            // https://www.themealdb.com/api/json/v1/
            const response = await axios.get(`${apiConfig.url.theMealDb}${apiConfig.key.theMealDb}/lookup.php?i=${this.recipeId}`);

            if (response && response.data && response.data.meals) {
                this.setRecipeData(this.formatRecipe(response.data.meals[0]));
            }

        } catch (error) {
            console.error(error);

            // Get offline recipe data.

            // let recipes = localRecipes.filter(r => r.recipe_id === this.recipeId)[0];
            this.setRecipeData(this.formatRecipe(localRecipesTheMealDb.meals.filter(r => r.idMeal === this.recipeId)[0]));
        }
    }

    calcRecipeTime() {
        // Assume that 3 ingredients will take around 15 minutes to cook in a recipe.

        const totalIngredients = this.ingredients.length;

        const periods = Math.ceil(totalIngredients / 3);

        this.time = periods * 15;

    }

    calcRecipeServings() {
        this.servings = 4;
    }

    updateServings(operation) {

        // update servings.
        let newServings = operation === 'inc' ? this.servings + 1 : this.servings - 1;

        if (newServings > 0) {
            // update ingredients
            this.ingredients.forEach(el => {
                if (el.count) {
                    el.count = el.count * (newServings / this.servings);

                    if (!Number.isInteger(el.count)) {
                        el.count = el.count.toFixed(2);
                    }
                }
            });

            this.servings = newServings;

        }
    }

    setRecipeData(recipe) {
        this.title = recipe.title;
        this.author = recipe.publisher;
        this.img = recipe.image_url;
        this.url = recipe.source_url;
        this.ingredients = recipe.ingredients;
    }

    formatRecipe(value) {
        let recipe = {
            recipe_id: value.idMeal,
            title: value.strMeal,
            image_url: value.strMealThumb,
            publisher: value.idMeal,
            source_url: value.strSource,
            ingredients: this.formatIngredients(value)
        };
        return recipe;
    }

    formatIngredients(value) {

        // ingredients: ['1000 g pasta', '1 can tuna packed in olive oil']

        // ['strIngredient1 + strMeasure1', 'strIngredient1 + strMeasure1'];
        /*
       
                       strIngredient1: "Aubergine",
                       strIngredient2: "Onion",
                       strIngredient3: "Tomatoes",
                       strIngredient4: "Garlic",
                       strIngredient5: "",
                       strMeasure1: "1 large",
                       strMeasure2: "½ cup ",
                       strMeasure3: "1 cup",
                       strMeasure4: "6 cloves",
                       strMeasure5: "",
       
               */

        const intMeasure = ['½', '¼'];
        const correctIntMesure = ['1/2', '1/4'];

        const concatMeasure = ['kg', 'g', 'ml'];
        const correctConcatMesure = [' kg', ' g', ' ml'];

        let keyIngredient = '';
        let keyMeasure = '';
        let newValue = '';
        let ingredients = [];

        for (let i = 1; i <= 20; i++) {
            keyIngredient = `strIngredient${i}`;
            keyMeasure = `strMeasure${i}`;

            intMeasure.forEach(
                (unit, index) => {
                    value[keyMeasure] = value[keyMeasure].replace(unit, correctIntMesure[index]);
                }
            );

            concatMeasure.forEach(
                (unit, index) => {
                    if (value[keyMeasure].split(' ')[0].includes(unit)) {
                        value[keyMeasure] = value[keyMeasure].replace(unit, correctConcatMesure[index]);
                    }
                }
            );

            newValue = `${value[keyMeasure]} ${value[keyIngredient]}`;
            if (!newValue.trim()) {
                break;
            }
            ingredients.push(newValue);
        }

        return ingredients;
    }

    parseIngredient() {

        /** Ingredients Samples
         * 1 pounds Ground Coffee (good, Rich Roast)
         * 8 quarts Cold Water
         * 1000 grams pasta
         * 1 can tuna packed in olive oil
         * 1 tablespoons butter, room temperature
         * 1/2 cup jack and cheddar cheese, shredded
         */

        const unitsLong = ['pounds', 'quarts', 'quarter', 'grams', 'ounces', 'ounce',
            'tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'cups', 'cup', 'tblsp', 'tbls'];
        const unitsShort = ['pound', 'qtr', 'qtr', 'gr', 'oz', 'oz',
            'tbsp', 'tbsp', 'tsp', 'tsp', 'cup', 'cup', 'tbsp', 'tbsp'];

        const units = [...unitsShort, 'kg', 'g']

        this.ingredients = this.ingredients.map(ingredient => {

            // parse Mesurement UNIT, Unit Quantity.

            // Remove parenthesis text and also chage ingredients case to Lowercase.
            ingredient = ingredient
                .replace(/ *\([^)]*\) */g, ' ')
                .toLowerCase();

            unitsLong.forEach((unit, index) => {
                ingredient = ingredient.replace(unit, unitsShort[index]);
            });

            let objIng;

            // Seperate Unit, Quantity/count and Ingredient.
            const arrIng = ingredient.split(' '); // [1, pound, Ground, Coffee]
            const unitIndex = arrIng.findIndex(value => units.includes(value));  // Index no. of [pound] i.e. [1]

            if (unitIndex > -1) {
                // Unit exists find the quantity or count and the ingredient.
                // [1, 1/2, pound, Ground, Coffee]
                let arrCountIng = arrIng.slice(0, unitIndex);   // [1, 1/2]

                let count;

                try {
                    if (arrCountIng.length === 1) {
                        // single count exists (with or without - symbol). 
                        count = eval(arrCountIng[0].replace('-', '+'));
                    } else if (arrCountIng.length > 1) {
                        // multiple count exists.
                        count = eval(arrCountIng.join('+'));
                    } else if (arrCountIng.length === 0) {
                        count = 1;
                    }
                } catch (error) {
                    console.error(error.message);
                    count = 0;
                }


                objIng = {
                    count: count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };


            } else if (parseInt(arrIng[0])) {
                // Unit doesn't exists but quantity or count exists.
                objIng = {
                    count: parseInt(arrIng[0]),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            } else if (unitIndex === -1) {
                // neither unit nor quantity exists.
                objIng = {
                    count: '',
                    unit: '',
                    ingredient: ingredient
                };
            }

            if (objIng.count && !Number.isInteger(objIng.count)) {
                objIng.count = objIng.count.toFixed(2);
            }

            return objIng;


        });

    }
}