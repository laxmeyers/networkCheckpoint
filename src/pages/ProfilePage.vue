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
        <div class="card-body">
            <p v-if="profile.bio">{{ profile.bio }}</p>
            <ul class="text-start">
                <li v-if="profile.github">github: {{ profile.github }}</li>
                <li v-if="profile.linkedin">linkedin: {{ profile.linkedin }}</li>
                <li v-if="profile.resume">resume: {{ profile.resume }}</li>
            </ul>
        </div>
        <div class="card-footer text-end d-flex justify-content-between"  v-if="account.id == profile.id">
            <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editForm">+</button>
            <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editForm">Edit</button>
        </div>
    </div>
    <div class="row my-4" v-for="post in posts">
        <Posts :post="post" />
    </div>
    <div class="sticky-bottom my-3 d-flex justify-content-between" v-if="page">
        <button class="btn btn-primary" :disabled="!page.newer" @click="getNewPage(page.newer)">newer</button>
        <button class="btn btn-primary" :disabled="!page.older" @click="getNewPage(page.older)">older</button>
    </div>

    <Modal v-if="account.id" id="editForm">
        <EditForm/> 
    </Modal>
</template>


<script>
import Pop from '../utils/Pop';
import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { onMounted, computed } from 'vue';
import { postsService } from '../services/PostsService';
import Modal from '../components/Modal.vue';
import EditForm from '../components/EditForm.vue';

export default {
    setup() {
        const route = useRoute();
        async function getProfile() {
            try {
                let profileId = route.params.profileId;
                await profilesService.getProfile(profileId);
                await profilesService.getProfilePosts(profileId);
            }
            catch (error) {
                Pop.error(error, "[getting profile]");
            }
        }
        onMounted(() => {
            getProfile();
        });
        return {
            profile: computed(() => AppState.profile),
            account: computed(() => AppState.account),
            posts: computed(() => AppState.posts),
            page: computed(() => AppState.page),
            async getNewPage(pageUrl) {
                try {
                    await postsService.getNewPage(pageUrl);
                }
                catch (error) {
                    Pop.error(error, "[getting new page]");
                }
            }
        };
    },
    components: { Modal, EditForm }
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