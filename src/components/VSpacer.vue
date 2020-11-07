<template>
  <div class="v-spacer" :style="{ width, height }"/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'VSpacer',

  props: {
    width: {
      type: String as PropType<string>
    },
    height: {
      type: String as PropType<string>
    }
  }
})
</script>

<style scoped>
</style>
