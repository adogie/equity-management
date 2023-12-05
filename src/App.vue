<template>
  <div class="vue-beatiful-admin">
    <a-config-provider :locale="locale" :theme="theme">
      <router-view />
    </a-config-provider>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const locale = ref(zhCN)
const theme = {
  token: {
    colorPrimary: '#1677ff',
    borderRadius: '4px'
  }
}
</script>
<style lang="less">
@import './assets/styles/reset.less';
</style>
