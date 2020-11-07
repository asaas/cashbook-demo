<template>
  <input class="amount-input" type="text" value=""/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AmountInput'
})
</script>

<style scoped>
.amount-input {
  padding: 5px;
  font-size: var(--font-size);
}
</style>
