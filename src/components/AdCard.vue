<template>
    <h6>{{ ad.title }}</h6>
    <div>
        <img class="img-fluid" :src="ad.square" alt="">
    </div>
</template>


<script>
export default {
    props: {
        ad: {type: Object, required:true}
    },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.ad{
  height: 50vh;
}
</style>