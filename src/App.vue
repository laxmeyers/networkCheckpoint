<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-3">
          <!-- who is logged in -->
        </div>
        <div class="col-6">
          <router-view />
        </div>
        <div class="col-3">
          <!-- ads -->
          <div class="sticky-top">
            <div class="bg-secondary text-center my-4 p-3 ad" v-for="ad in ads">
              <AdCard :ad="ad"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import {adsService} from './services/AdsService'
import Navbar from './components/Navbar.vue'
import Pop from './utils/Pop'
import AdCard from './components/AdCard.vue'

export default {
  setup() {
    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.error(error, '[getting ads]')
      }
    }

    onMounted(() => {
      getAds()
    })
    return {
      ads: computed(() => AppState.ads)
    }
  },
  components: { Navbar, AdCard }
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
