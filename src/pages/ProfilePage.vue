<template>
    <div v-if="profile.coverImg">
        <img class="img-fluid" :src="profile.coverImg" alt="">
    </div>
    <div class="card elevation-5 move-card">
        <div class="card-header d-flex align-items-start justify-content-between">
            <span>
                <img class="img-fluid profile-pic" :src="profile.picture" :alt="profile.name">
            </span>
            <span v-if="profile.graduated">
                <i class="mdi mdi-school"></i>
            </span>
            <span>
                <h1 class="fs-3">{{ profile.name }}</h1>
            </span>
            <span class="p-1">
                <h5>{{ profile.class }}</h5>
            </span>
        </div>
        <div class="card-body text-center">
            <p>{{ profile.bio }}</p>
        </div>
        <div class="card-footer" v-if="account.id != profile.id">
            hello there
        </div>
    </div>
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
            account: computed(() => AppState.account),
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


<style lang="scss" scoped>
.profile-pic {
    height: 20vh;
    width: 20vh;
    object-fit: cover;
}

.move-card{
    transform: translateY(-20vh);
}
</style>