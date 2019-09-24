export default class Like {

    constructor() {

        // read likes from storage if available.

        let likesFromStorage = localStorage.getItem('likes')

        if (likesFromStorage) {
            likesFromStorage = JSON.parse(likesFromStorage);

            this.likes = likesFromStorage;
        } else {
            this.likes = [];
        }
    }

    addLike(id, title, author, img) {

        const newRecipe = {
            id,
            title,
            author,
            img
        }

        this.likes.push(newRecipe);

        localStorage.setItem('likes', JSON.stringify(this.likes));
        return newRecipe;

    }

    removeLike(id) {
        const index = this.likes.findIndex(r => r.id === id);

        this.likes.splice(index, 1);

        if (this.likes.length > 0) {
            localStorage.setItem('likes', JSON.stringify(this.likes));
        } else {
            localStorage.removeItem('likes');
        }
    }

    noOfLikes() {
        return this.likes.length;
    }

    isRecipeLiked(id) {
        const recipeIndex = this.likes.findIndex(l => l.id === id);
        return (recipeIndex === -1) ? false : true;
    }

} 