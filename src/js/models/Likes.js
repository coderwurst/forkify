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
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(element => element.uid === id);
        this.likes.splice(index, 1);
    }

    isLiked(id){
        return this.likes.findIndex(element => element.id === id) != -1;
    }

    getNumberLikes() {
        return this.likes.length;
    }

}