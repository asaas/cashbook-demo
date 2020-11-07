<template>
  <input
    type="text"
    class="amount-input"
    v-model="amount"
    />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

interface State {
  amount: string;
}

export default defineComponent({
  name: 'AmountInput',

  setup() {
    const state = reactive<State>({
      amount: ''
    });

    const getAmount = () => state.amount;

    return {
      ...toRefs(state),
      getAmount
    }
  }
})
</script>

<style scoped>
.amount-input {
  padding: 5px;
  font-size: var(--font-size);
}
</style>
