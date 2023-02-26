<template>
    <div class="d-flex justify-content-center">
        <SearchForm />
    </div>
    <div class="row my-4" v-for="post in posts" v-if="home">
        <ProfileSearch :post="post" />
    </div>
    <div class="row my-4" v-for="post in posts">
        <Posts :post="post" />
    </div>
    <div class="sticky-bottom my-3 d-flex justify-content-between" v-if="page && !home">
        <button class="btn btn-primary" :disabled="!page.newer" @click="getNewPage(page.newer)">newer</button>
        <button class="btn btn-primary" :disabled="!page.older" @click="getNewPage(page.older)">older</button>
    </div>
</template>

<script>
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService'
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState';
import ProfileSearch from '../components/ProfileSearch.vue';

export default {
    setup() {
        async function getPosts() {
            try {
                await postsService.getPosts();
            }
            catch (error) {
                Pop.error(error, "[getting posts]");
            }
        }
        onMounted(() => {
            getPosts();
        });
        return {
            posts: computed(() => AppState.posts),
            page: computed(() => AppState.page),
            home: computed(() => AppState.home),
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
    components: { ProfileSearch }
}
</script>

<style scoped lang="scss"></style>
