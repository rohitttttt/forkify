export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    recipesList: document.querySelector('.results__list'),
    recipesResult: document.querySelector('.results'),
    recipesPagination: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    likesList: document.querySelector('.likes__list'),
    // likesMenu: document.querySelector('.likes__field')
}

const elementsString = {
    loader: 'loader'
}

export const loader = (element) => {

    const spinnerMarkup = `
        <div class="${elementsString.loader}">
            <svg>
                <use href="./img/icons.svg#icon-cw"> </use>
            </svg>
        </div>
    `;

    element.insertAdjacentHTML('afterbegin', spinnerMarkup);
};

export const clearLoader = () => {

    const loader = document.querySelector(`.${elementsString.loader}`);

    loader.parentElement.removeChild(loader);
};