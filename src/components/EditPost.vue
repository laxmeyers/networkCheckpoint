<template>
    <form @submit.prevent="editPost()">
        <div class="mb-3">
            <label for="body" class="form-label">Text</label>
            <input v-model="editable.body" type="text" class="form-control" id="body" aria-describedby="body">
        </div>
        <div class="mb-3">
            <label for="imgUrl" class="form-label">image</label>
            <input v-model="editable.img" type="url" class="form-control" id="imgUrl">
        </div>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Add</button>
    </form>
</template>


<script>
import { ref, onMounted } from 'vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref(AppState.posts[AppState.activePost])
        return {
            editable,
            async editPost() {
                try {
                    await postsService.editPost(editable.value)
                } catch (error) {
                    Pop.error(error, '[making post]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>