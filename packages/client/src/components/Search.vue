<script setup lang="ts">
import { ref } from 'vue'
import Switch from './Switch.vue'

// const showUnavailable = ref(false)
const querystring = ref('')

const emit = defineEmits(['set-show-unavailable', 'set-query-string'])

function setQueryString() {
  emit('set-query-string', querystring.value)
}

</script>

<template>
  <div class="flex-container">
    <div class="search" id="query">
      <p>
        <input type="text" v-model="querystring" @keypress.enter="setQueryString"/>
        <button @click="setQueryString">Search</button>
      </p>
    </div>
    <Switch
      text="Show unavailable"
      @switch-clicked="val => emit('set-show-unavailable', val)"
    />
  </div>
</template>

<style scoped>
.search{
  text-align: center;
}

input {
  height: 2.5rem;
  width: 20rem;
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.flex-container {
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 35rem;
}
</style>
