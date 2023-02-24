import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Post } from "../models/Post"

class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        AppState.posts = res.data.posts.map(p => new Post(p))
    }
}

export const postsService = new PostsService()