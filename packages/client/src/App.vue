<script setup lang="ts">
import Search from './components/Search.vue'
import Shop from './components/Shop.vue'
import { ref } from 'vue'

const API_URL = import.meta.env.VITE_APP_API_URL;

async function getShops() {
  const resp = await fetch(API_URL + '/shops')
  shops.value = await resp.json()
}

const shops = ref([])
const showUnavailable = ref(false)
const queryString = ref<string>('')

getShops()
</script>

<template>
  <div class="title">
    Boardgame Prices
  </div>
  <Search
    @set-query-string="val => queryString = val"
    @set-show-unavailable="val => showUnavailable = val"
  />
  <hr>
  <section class="section">
    <div class="container">
      <div class="columns is-multiline">
        <Shop
          class="shop"
          v-for="shop of shops"
          :name="shop"
          :showUnavailable="showUnavailable"
          :queryString="queryString"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.title {
  font-size: 36px;
  text-align: center;
}

.shop {
  min-width: 18rem;
}
</style>
