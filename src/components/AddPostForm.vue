<template>
    <form @submit.prevent="makePost()">
        <div class="mb-3">
            <label for="body" class="form-label">Text</label>
            <input v-model="editable.body" type="text" class="form-control" id="body" aria-describedby="body">
        </div>
        <div class="mb-3">
            <label for="imgUrl" class="form-label">image</label>
            <input v-model="editable.imgUrl" type="url" class="form-control" id="imgUrl">
        </div>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Add</button>
    </form>
</template>


<script>
import { ref } from 'vue';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref({})
        return {
            editable,
            async makePost() {
                try {
                    await postsService.makePost(editable.value)
                    editable.value = {}
                } catch (error) {
                    Pop.error(error, '[making post]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>