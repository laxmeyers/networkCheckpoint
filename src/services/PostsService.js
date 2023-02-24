import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from "../AppState"

class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        logger.log(res.data.posts)
        AppState.posts = res.data
    }
}

export const postsService = new PostsService()