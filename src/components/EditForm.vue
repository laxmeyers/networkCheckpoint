<template>
    <form @submit.prevent="handleForm()" v-if="account.id">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" v-model="editable.name" class="form-control" id="name" aria-describedby="Name" required>
        </div>
        <div class="mb-3">
            <label for="picture" class="form-label">Picture</label>
            <input type="url" v-model="editable.picture" class="form-control" id="picture">
        </div>
        <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>
            <textarea type="text" v-model="editable.bio" class="form-control" id="bio">
            </textarea>
        </div>
        <div class="mb-3">
            <label for="class" class="form-label">Graduating class</label>
            <input type="date" v-model="editable.class" class="form-control" id="class">
        </div>
        <div class="mb-3">
            <label for="linkedin" class="form-label">Linkedin</label>
            <input type="url" v-model="editable.linkedin" class="form-control" id="linkedin">
        </div>
        <div class="mb-3">
            <label for="github" class="form-label">Github</label>
            <input type="url" v-model="editable.github" class="form-control" id="github">
        </div>
        <div class="mb-3">
            <label for="resume" class="form-label">Resume</label>
            <input type="url" v-model="editable.resume" class="form-control" id="resume">
        </div>
        <div class="mb-3">
            <label for="coverImg" class="form-label">Cover Image</label>
            <input type="url" v-model="editable.coverImg" class="form-control" id="coverImg">
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" v-model="editable.graduated" :checked="editable.graduated" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Graduated</label>
        </div>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Edit</button>
    </form>
</template>


<script>
import { ref, computed } from 'vue';
import { AppState } from '../AppState';
import { accountService } from '../services/AccountService';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref(AppState.account)
        return {
            editable,
            account: computed(() => AppState.account),
            async handleForm() {
                try {
                    await accountService.handleForm(editable.value)
                } catch (error) {
                    Pop.error(error, '[handling form submission]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>