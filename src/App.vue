<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-3">
          <!-- who is logged in -->
        </div>
        <div class="col-6">
          <router-view />
        </div>
        <div class="col-3">
          <!-- ads -->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
