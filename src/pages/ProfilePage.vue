<template>
    <div class="row my-4" v-for="post in posts">
        <Posts :post="post" />
    </div>
    <div class="sticky-bottom my-3 d-flex justify-content-between" v-if="page">
        <button class="btn btn-primary" :disabled="!page.newer" @click="getNewPage(page.newer)">newer</button>
        <button class="btn btn-primary" :disabled="!page.older" @click="getNewPage(page.older)">older</button>
    </div>
</template>


<script>
import Pop from '../utils/Pop';
import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { onMounted, computed } from 'vue';
import { postsService } from '../services/PostsService';

export default {
    setup() {
        const route = useRoute()
        async function getProfile() {
            try {
                let profileId = route.params.profileId
                await profilesService.getProfile(profileId)
                await profilesService.getProfilePosts(profileId)
            } catch (error) {
                Pop.error(error, '[getting profile]')
            }
        }

        onMounted(() => {
            getProfile()
        })
        return {
            profile: computed(() => AppState.profile),
            posts: computed(() => AppState.posts),
            page: computed(() => AppState.page),

            async getNewPage(pageUrl) {
                try {
                    await postsService.getNewPage(pageUrl)
                } catch (error) {
                    Pop.error(error, '[getting new page]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>