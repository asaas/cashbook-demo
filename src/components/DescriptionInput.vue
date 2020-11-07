<template>
  <input class="description-input" type="text" value=""/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DescriptionInput'
})
</script>

<style scoped>
.description-input {
  width: 300px;
  padding: 5px;
  font-size: var(--font-size);
}
</style>
