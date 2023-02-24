<template>
  <div class="row my-4" v-for="post in posts">
    <div class="col-12">
      <div class="card">
        <div class="card-header d-flex">
          <img class="post-profile-picture rounded-circle" :src="post.creator.picture" alt="">
          <div>
            <h1 class="fs-5">{{ post.creator.name }}</h1>
            <p>{{ post.createdAt }}</p>
          </div>
        </div>
        <div class="card-body">
          {{ post.body }}
          <div class="my-2">
            <img class="img-fluid w-100" :src="post.img" alt="">
          </div>
        </div>
      </div>
    </div>
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
.post-profile-picture{
  height: 10vh;
  width: 10vh;
  object-fit: cover;
}
</style>
