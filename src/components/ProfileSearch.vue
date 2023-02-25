<template>
    <div class="col-12">
        <div class="card elevation-4">
            <div class="card-header d-flex">
                <span>
                    <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
                        <img class="post-profile-picture rounded-circle elevation-2" :src="post.creator.picture" alt="">
                    </router-link>
                </span>
                <span v-if="post.creator.graduated">
                    <i class="mdi mdi-school"></i>
                </span>
                <div>
                    <h1 class="fs-5">{{ post.creator.name }}</h1>
                    <p>{{ post.createdAt }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { Post } from '../models/Post';

export default {
    props: {
        post: { type: Post, required: true }
    },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.post-profile-picture {
    height: 10vh;
    width: 10vh;
    object-fit: cover;
}
</style>