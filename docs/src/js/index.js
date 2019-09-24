import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import Like from './models/Like';

import { elements, loader, clearLoader } from './views/baseView';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import * as likeView from './views/likeView';

/** 
 * Maintain Global State of App.
 * Search State.
 * Recipe State.
 * Shopping List State.
 * Like State.
 */
const state = {
    // will centerally manage state of all domains like search, recipe, shoppinglist and likes.
    like: new Like()
};

window.state = state;
// debugger;
const searchController = async () => {

    // Read User Input from UI.
    const query = searchView.getQuery();
    // const query = 'pizza';
    if (query) {

        // Create Search Model & Store in State.
        state.search = new Search(query);

        // Do some UI things like Progress Spinner and also make UI ready for the result.
        searchView.clearInput();
        searchView.clearRecipeList();
        loader(elements.recipesResult);

        // Execute GetRecipesAsync() method from Search Model.
        await state.search.getRecipesAsync();

        if (state.search.result) {
            // Display Searched Recipies in UI.
            searchView.renderRecipes(state.search.result);
        }
        clearLoader();
    }
};

elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchController();
});

elements.recipesPagination.addEventListener('click', e => {

    const paginationBtn = e.target.closest('.btn-inline');

    if (paginationBtn) {
        const pageNo = parseInt(paginationBtn.dataset.goto);

        searchView.clearRecipeList();
        searchView.renderRecipes(state.search.result, pageNo);
    }
});

const recipeController = async () => {

    // Get Recipe Item Anchor HTML element.
    // const recipeId = parseInt(window.location.hash.replace('#', ''));
    const recipeId = window.location.hash.replace('#', '');


    if (recipeId) {

        recipeView.highlighter(recipeId);

        // Store recipe model in the global state.
        state.recipe = new Recipe(recipeId);

        // UI tasks: Clear previous Recipe Details & Show Loader
        recipeView.clearRecipe();
        loader(elements.recipe);

        // get recipe detail from recipe model.
        await state.recipe.getRecipeAsync();

        state.recipe.parseIngredient();

        // calculate time & servings.
        state.recipe.calcRecipeTime();
        state.recipe.calcRecipeServings();

        // Render Recipe.
        let isLiked = state.like.isRecipeLiked(recipeId);
        recipeView.renderRecipe(state.recipe, isLiked);
        clearLoader();

    }
};


var shoppingListController = () => {
    state.shoppingList = new ShoppingList();

    shoppingListView.clearShoppingList();

    state.recipe.ingredients.forEach(el => {

        const newItem = state.shoppingList.addItem(el.count, el.unit, el.ingredient);
        shoppingListView.renderItem(newItem);

    });
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, recipeController));

var likeController = () => {
    if (state.like.isRecipeLiked(state.recipe.recipeId)) {
        // Unlike.

        recipeView.showRecipeLike(false);

        state.like.removeLike(state.recipe.recipeId);

        // remove like from ul UI.
        likeView.unlike(state.recipe.recipeId);

    } else {
        // Like.

        recipeView.showRecipeLike(true);

        const likedRecipe = state.like.addLike(
            state.recipe.recipeId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        likeView.like(likedRecipe);

    }

    likeView.showLikeMenu(state.like.noOfLikes());


}

elements.recipe.addEventListener('click', e => {

    if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServings(state.recipe);
    } else if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        state.recipe.updateServings('dec');
        recipeView.updateServings(state.recipe);
    } else if (e.target.matches('.add-to-shopping__btn, .add-to-shopping__btn *')) {
        shoppingListController();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        likeController();
    }
});


elements.shoppingList.addEventListener('click', e => {

    const id = e.target.closest('.shopping__item').dataset.id;

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.shoppingList.deleteItem(id);
        shoppingListView.deleteItem(id);
    } else if (e.target.matches('.item_count')) {
        const newCount = e.target.value;
        state.shoppingList.updateCount(id, newCount);
    }
});

window.addEventListener('load', () => {
    // load likes list.

    state.like.likes.forEach(el => {
        likeView.like(el);
    });
});


