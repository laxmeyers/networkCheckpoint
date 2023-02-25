<template>
    <form @submit.prevent="">
        <div class="mb-3">
            <label for="body" class="form-label">Text</label>
            <input type="text" class="form-control" id="body" aria-describedby="body">
        </div>
        <div class="mb-3">
            <label for="imgUrl" class="form-label">image</label>
            <input type="url" class="form-control" id="imgUrl">
        </div>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Add</button>
    </form>
</template>


<script>
export default {
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped></style>