export default class Like {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, image){
        const like = {
            id,
            title,
            author,
            image
        }
        this.likes.push(like);
       
        this.persistData();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(element => element.uid === id);
        
        this.likes.splice(index, 1);
        
        this.persistData();
    }

    isLiked(id){
        return this.likes.findIndex(element => element.id === id) != -1;
    }

    getNumberLikes() {
        return this.likes.length;
    }

    persistData() {
        // place likes in local storage
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        // restore likes from local storage
        if (storage) this.likes = storage;
    }
}