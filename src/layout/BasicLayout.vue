<template>
  <div class="home">
    <router-view />
  </div>
</template>

<script setup>
import store from '@/hooks/store'
import { onMounted } from 'vue'

onMounted(() => {
  store.getUserInfo()
})
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100vh;
  background-color: rgb(238 242 251);
}
</style>
