import { elements } from './baseView';

// Item Render.

export const renderItem = item => {

    const itemMarkup = `
                <li class="shopping__item" data-id="${item.id}">
                    <div class="shopping__count">
                        <input class="item_count" type="number" value="${item.count}" step="${item.count}">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.itemName}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
    `;

    elements.shoppingList.insertAdjacentHTML('beforeend', itemMarkup);

};

// Item Delete.

export const deleteItem = id => {

    const itemEl = document.querySelector(`li.shopping__item[data-id="${id}"]`);

    itemEl.parentElement.removeChild(itemEl);
}

export const clearShoppingList = () => elements.shoppingList.innerHTML = '';
