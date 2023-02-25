export class Post{
    constructor(data) {
        this.body = data.body || ''
        this.img = data.imgUrl || ""
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.createdAt = new Date(data.createdAt).toLocaleDateString()
        this.creator = data.creator
        this.likes = data.likes
        this.id = data.id
    }
}

