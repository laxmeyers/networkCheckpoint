<template>
    <div class="col-12">
        <div class="card elevation-4">
            <div class="card-header d-flex">
                <span >
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
            <div class="card-body">
                {{ post.body }}
                <div class="my-2" v-if="post.img">
                    <img class="img-fluid w-100" :src="post.img" alt="picture">
                </div>
                <h5><i class="mdi mdi-heart text-danger selectable" @click="addLike()"></i> {{ post.likes.length }}</h5>
            </div>
            <div class="card-footer d-flex justify-content-between" v-if="post.creatorId == account.id">
                <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editPost" @click="setActivePost(post)">Edit</button>
                <button class="btn btn-danger" @click="destroyPost(post)">Delete</button>
            </div>
        </div>
    </div>

    <Modal id="editPost">
        <EditPost/>
    </Modal>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { Post } from '../models/Post';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
import EditPost from './EditPost.vue';
import Modal from './Modal.vue';

export default {
    props: {
        post: { type: Post, required: true }
    },
    setup(props) {
        return {
            account: computed(() => AppState.account),
            async addLike() {
                try {
                    await postsService.addLike(props.post.id);
                }
                catch (error) {
                    Pop.error(error, "[adding or removing like]");
                }
            },

            setActivePost(post) {
                try {
                    postsService.setActivePost(post)
                } catch (error) {
                    Pop.error(error, '[setting active post]')
                }
            },

            async destroyPost(post) {
                try {
                    if (await Pop.confirm('are you sure?')) {
                        await postsService.destroyPost(post)
                    }
                } catch (error) {
                    Pop.error(error, '[deleting post]')
                }
            }
        };
    },
    components: { Modal, EditPost }
}
</script>


<style lang="scss" scoped>
.post-profile-picture {
    height: 10vh;
    width: 10vh;
    object-fit: cover;
}
</style>