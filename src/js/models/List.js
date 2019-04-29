import uniqid from 'uniqid'

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            uid: uniqid(),
            count,
            unit,
            ingredient,
        }

        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(element => element.uid === id);
        // [2,4,8] slice (1, 2)  ---> starts at 1, ends at 2 and returns [4] & original === [2,4,8]
        // [2,4,8] splice (1, 2) ---> starts at one, includes 2 values and returns [4, 8] & removes 2 from original === [2]
        this.items.splice(index, 1);
    }

    updateCount(id, newCount){
        this.items.find(element => element.uid === id).count = newCount;
    }
}