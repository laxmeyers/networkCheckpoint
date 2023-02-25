import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { Account } from "../models/Account"

class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        AppState.posts = res.data.posts.map(p => new Post(p))
        logger.log(res.data)
        AppState.page = res.data
    }

    async getNewPage(pageUrl) {
        const res = await api.get(pageUrl)
        logger.log(res.data)
        AppState.page = res.data
        AppState.posts = res.data.posts.map(p => new Post(p))
    }

    async addLike(postId) {
        const res = await api.post('api/posts/' + postId + '/like')
        logger.log(res.data)
        let post = AppState.posts.findIndex(p => p.id == postId)
        if (!AppState.posts[post].likes.find(l => l.id == AppState.account.id)) {
            AppState.posts[post].likes.push(new Account(AppState.account))     
            logger.log('help', AppState.account.id, AppState.posts[post].likes)
        } else {
            if (AppState.posts[post].likes.length == 0) {
                AppState.posts[post].likes = []
            } else {
                AppState.posts[post].likes = AppState.posts[post].likes.filter(l => l.id != AppState.account.id)  
            }
        }
    }

    async makePost(formData) {
        const res = await api.post('api/posts', formData)
        logger.log(res.data)
        AppState.posts.push(new Post(res.data))
    }

    setActivePost(post) {
        AppState.activePost = AppState.posts.findIndex(p => p.id == post.id)
        
    }

    async editPost(formData) {
        let post = AppState.posts.findIndex(p => p.id == AppState.posts[AppState.activePost].id)
        let postObject = AppState.posts[post]
        const res = await api.put('api/posts/' + postObject.id, formData)
        AppState.posts.splice(post, 1, new Post(res.data))
    }

    async destroyPost(post) {
        let postRemove = AppState.posts.findIndex(p => p.id == AppState.posts[AppState.activePost].id)
        const res = await api.delete('api/posts/' + post.id)
        AppState.posts.splice(postRemove, 1)
    }
}

export const postsService = new PostsService()