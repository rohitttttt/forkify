import uniqid from 'uniqid';

export default class ShoppingList {

    constructor() {
        this.list = [];
    }

    addItem(count, unit, itemName) {

        const newItem = {
            id: uniqid(),
            count,
            unit,
            itemName
        };

        this.list.push(newItem);

        return newItem;
    }

    deleteItem(id) {
        const index = this.list.findIndex(i => i.id === id);
        this.list.splice(index, 1);
    }

    updateCount(id, newCount) {
        const item = this.list.find(i => i.id === id);

        item.count = newCount;
    }
}