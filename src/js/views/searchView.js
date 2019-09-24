import { elements } from './baseView';

export const getQuery = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearRecipeList = () => {
    elements.recipesList.innerHTML = '';
    elements.recipesPagination.innerHTML = '';
};

const paginationButtonMarkup = (type, pageNo) => `
    <button class="btn-inline results__btn--${type}" data-goto = "${type === 'prev' ? pageNo - 1 : pageNo + 1}">
        <span>Page ${ type === 'prev' ? pageNo - 1 : pageNo + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderPagination = (pageNo, totalItems, itemPerPage) => {

    const pageCount = Math.ceil(totalItems / itemPerPage);
    let paginationMarkup;

    if (pageNo === 1 && pageCount > 1) {
        // First Page: Display only Next button. 
        paginationMarkup = paginationButtonMarkup('next', pageNo);
    } else if (pageNo < pageCount) {
        // Middle Page: Display both Next and Prev button.
        paginationMarkup = `
        ${paginationButtonMarkup('prev', pageNo)}
        ${paginationButtonMarkup('next', pageNo)}
        `;
    } else if (pageNo === pageCount && pageCount > 1) {
        // Last Page: Display only Prev Button.
        paginationMarkup = paginationButtonMarkup('prev', pageNo);
    }

    if (paginationMarkup) {
        elements.recipesPagination.insertAdjacentHTML('afterbegin', paginationMarkup);
    }
};

export const renderRecipes = (recipes, pageNo = 1, itemPerPage = 5) => {

    if (recipes.length > 0) {
        // RenderRecipes.
        const start = (pageNo - 1) * itemPerPage;
        const end = start + itemPerPage; //pageNo * itemPerPage;

        recipes.slice(start, end).forEach(renderRecipe);

        // Render Pagination.
        renderPagination(pageNo, recipes.length, itemPerPage);
    }
};

const limitRecipeTitle = (title, limit = 17) => {

    /**
     * Rules: 
     * #1. Show only full words in the title. 
     * #2. Limit title to the specified value.
     * Sample Title: 
     * Farm House Pizza Dough
     */


    if (title.length > 17) {

        const newTitle = [];

        title.split(' ').reduce((prevVal, curVal) => {

            if ((prevVal + curVal.length) <= limit) {
                newTitle.push(curVal);
            }

            return prevVal + curVal.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    };

    return title;

};

const renderRecipe = (recipe) => {

    // id="${recipe.recipe_id}"
    const recipeMarkup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}" >
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

    elements.recipesList.insertAdjacentHTML('beforeend', recipeMarkup);

};
