<template>
  <input
    type="text"
    class="amount-input"
    v-model="amount"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
  name: 'AmountInput',

  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup(props, context) {
    const amount = computed({
      get: () => props.modelValue,
      set: (value: string) => {
        if (value !== props.modelValue) {
          context.emit('update:modelValue', value);
        }
      }
    });

    return {
      amount
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
