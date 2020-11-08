<template>
  <input
    type="text"
    class="amount-input"
    v-model="amount_"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
  name: 'AmountInput',

  props: {
    amount: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup(props, context) {
    const amount_ = computed({
      get: () => props.amount,
      set: (value: string) => {
        if (value !== props.amount) {
          context.emit('amount-change', value);
        }
      }
    });

    return {
      amount_
    };
  }
})
</script>

<style scoped>
.amount-input {
  padding: 5px;
  font-size: var(--font-size);
}
</style>
