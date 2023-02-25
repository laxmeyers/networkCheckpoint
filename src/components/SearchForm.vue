<template>
    <div>
        <form @submit.prevent="searchResults()">
            <div class="form-floating mb-3 d-flex">
                <input v-model="editable.query" type="text" class="form-control" id="floatingInput"
                    placeholder="name@example.com" required>
                <label for="floatingInput">Search</label>
                <button type="submit" class="btn btn-success">Search</button>
            </div>
        </form>
        <div v-if="seeHome">
            <button @click="getPosts()" class="btn btn-primary">leave</button>
        </div>
    </div>
</template>


<script>
import { ref, computed } from 'vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import { profilesService } from '../services/ProfilesService';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref({})
        return {
            seeHome: computed(() => AppState.home),
            editable,
            async searchResults() {
                try {

                    await postsService.searchResults(editable.value)
                    await profilesService.searchResults(editable.value)
                    editable.value = {}
                } catch (error) {
                    Pop.error(error, '[getting search results]')
                }
            },
            async getPosts() {
                    try {
                        await postsService.getPosts()
                    } catch (error) {
                        Pop.error(error, "[getting posts]")
                    }
                }
        }
    }
}
</script>


<style lang="scss" scoped></style>