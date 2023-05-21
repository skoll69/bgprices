<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ResponseData } from "@bgprices-sst/shared/interface";
import Game from './Game.vue'

const API_URL = import.meta.env.VITE_APP_API_URL;

const props = defineProps<{
  name: string,
  showUnavailable: boolean,
  queryString: string,
}>()

const results = ref<ResponseData[]>([]);
const searching = ref(false);

const logoUrl = computed(() => {
  return `/${props.name}.png`
})

async function search(queryString: string) {
  const resp = await fetch(`${API_URL}/query/${props.name}?q=${queryString}`)
  results.value = await resp.json()
}

watch(() => props.queryString, async (value) => {
  searching.value = true
  results.value = []
  await search(value)
  searching.value = false
});
</script>

<template>
  <div class="column is-3-desktop is-half-tablet">
    <img class="title_img" :src="logoUrl" /><br>
    <img class="searching_img" v-if="searching" src="/loading.gif"/>
    <Game
      v-for="item in results" :key="item.name" :data="item" :showUnavailable="showUnavailable">
    </Game>
    <div v-if="results.length == 0">No results</div>
  </div>
</template>

<style scoped>
.title_img{
  max-width: 240px;
  max-height: 80px;
}

.searching_img{
  max-width: 120px;
  max-height: 120px;
}
</style>
