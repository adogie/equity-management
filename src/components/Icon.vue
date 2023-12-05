<template>
  <img v-if="url" :src="iconUrl" :class="imgClass" v-bind="$attrs" />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  // icon 名称
  iconClass: {
    type: String,
    default: ''
  },
  // 样式名称
  className: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: ''
  }
})
const iconName = computed(() => {
  return `#icon-${props.iconClass}`
})
const svgClass = computed(() => {
  return 'svg-icon ' + props.className
})
const iconUrl = computed(() => {
  return require(`@/assets/images/${props.url}.png`)
})
const imgClass = computed(() => {
  return 'img-responsive ' + props.className
})
</script>
<style scoped lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
img {
  cursor: pointer;
}
</style>
