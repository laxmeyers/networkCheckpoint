<template>
    <form>
        <div class="form-floating mb-3 d-flex">
            <input v-model="editable" type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Search</label>
            <button type="submit" class="btn btn-success">Search</button>
        </div>
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