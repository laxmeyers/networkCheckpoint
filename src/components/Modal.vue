<template>
    <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import EditForm from './EditForm.vue';

export default {
    setup() {
        return {};
    },
    components: { EditForm }
}
</script>


<style lang="scss" scoped></style>