<template>
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
        <div class="card-footer d-flex justify-content-between" v-if="post.creatorId == account.id">
            <button class="btn btn-info">Edit</button>
            <button class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { Account } from '../models/Account';
import { Post } from '../models/Post';

export default {
    props: {
        post: { type: Post, required: true }
    },
    setup(){
        return {
            account: computed(()=> AppState.account)
        }
    }
}
</script>


<style lang="scss" scoped>
.post-profile-picture{
  height: 10vh;
  width: 10vh;
  object-fit: cover;
}
</style>