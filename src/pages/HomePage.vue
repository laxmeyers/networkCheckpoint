<template>
  <div class="row my-4" v-for="post in posts">
    <Posts :post="post"/>
  </div>
</template>

<script>
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService'
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState';

export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error, "[getting posts]")
      }
    }

    onMounted(() => {
      getPosts()
    })
    return {
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
