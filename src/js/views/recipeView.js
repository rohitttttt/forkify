import { elements } from './baseView';
import { Fraction } from 'fractional';


// this.title = recipe.title;
//         this.author = recipe.publisher;
//         this.img = recipe.image_url;
//         this.url = recipe.source_url;
//         this.ingredients = recipe.ingredients;
//         this.recipeId

export const showRecipeLike = (isLiked) => {

    const el = document.querySelector('.header__likes use');

    if (isLiked) {
        el.setAttribute('href', 'img/icons.svg#icon-heart');
    } else {
        el.setAttribute('href', 'img/icons.svg#icon-heart-outlined');
    }
}

export const updateServings = recipe => {

    // update servings.

    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    // update ingredients.
    document.querySelectorAll('.recipe__count')
        .forEach((el, index) => el.textContent = recipe.ingredients[index].count);

};

const formatDecimalNumber = (number) => {

    let formattedNo = '';

    if (number) {

        // 0.5 => 1/2
        // 2.25 => 2 1/4
        // 3.50 => 3 1/2

        let [num, dec] = number.toString().split('.').map(el => parseInt(el));
        // num = 0 ; dec = 5 ;
        // num =2 ; dec = 25;
        // num = 3; dec = 50;

        if (!dec) return number;

        let fr;
        if (num === 0) {
            fr = new Fraction(number);
            formattedNo = `${fr.numerator}/${fr.denominator}`;
        } else {
            fr = new Fraction(number - num);
            formattedNo = `${num} & ${fr.numerator}/${fr.denominator}`;
        }
    }

    return formattedNo;
};

export const highlighter = (recipeId) => {

    if (recipeId) {
        // First remove all existing highlighter class.

        const allHighlighter = document.querySelectorAll('.results__link--active');

        allHighlighter.forEach(element => {
            element.classList.remove('results__link--active');
        });

        let recipeItem = document.querySelector(`a[href="#${recipeId}"]`);

        if (recipeItem) {
            recipeItem.classList.add('results__link--active');
        }
    }
};

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};

const renderIngredient = (ingredient) => `
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${formatDecimalNumber(ingredient.count)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.ingredient}
            </div>
        </li>
    `;

export const renderRecipe = (recipe, isLiked) => {
    // this method will render the recipe detail in the mid section of HTML.
    const recipeFigureMarkup = `
    <figure class="recipe__fig">
        <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
            </svg>
        </button>
    </div>



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${ recipe.ingredients.map(value => renderIngredient(value)).join('')}

        </ul>

        <button class="btn-small add-to-shopping__btn">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
    `;

    elements.recipe.insertAdjacentHTML('afterbegin', recipeFigureMarkup);
};