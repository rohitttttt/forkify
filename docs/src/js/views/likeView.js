import { elements } from './baseView';

export const showLikeMenu = noOfLikes => {
    const el = document.querySelector('.likes__field');
    // const el = elements.likesMenu;

    el.style.visibility = noOfLikes > 0 ? 'visible' : 'hidden';
}

export const unlike = id => {

    const el = document.querySelector(`.likes__list a[href*="${id}"]`).closest('li');

    el.parentElement.removeChild(el);

};

export const like = recipe => {

    const likeMarkup = `
            <li>
                <a class="likes__link" href="#${recipe.id}">
                    <figure class="likes__fig">
                        <img src="${recipe.img}" alt="${recipe.title}">
                    </figure>
                    <div class="likes__data">
                        <h4 class="likes__name">${recipe.title}</h4>
                        <p class="likes__author">${recipe.author}</p>
                    </div>
                </a>
            </li>
    `;

    elements.likesList.insertAdjacentHTML('beforeend', likeMarkup);

}