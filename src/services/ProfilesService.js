import { AppState } from "../AppState"
import { Account } from "../models/Account"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {

    async getProfile(profileId) {
        AppState.profile = {}
        const res = await api.get('api/profiles/' + profileId)
        // logger.log(res.data)
        AppState.profile = new Account(res.data)
    }

    async getProfilePosts(profileId) {
        AppState.posts = []
        const res = await api.get(`api/profiles/${profileId}/posts`)
        logger.log(res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.page = res.data
    }

    async searchResults(formData) {
        const res = await api.get('api/profiles', { params: { query: formData.query } })
        logger.log('profiles', res.data)
        AppState.searchResults = res.data.map(p => new Account(p))
    }
}

export const profilesService = new ProfilesService()