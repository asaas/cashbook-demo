<template>
  <input
    type="text"
    ref="input"
    class="description-input"
    v-model="description_"
    @focus="handleFocus"
    @blur="handleBlur"
    @keydown.enter="handleEnter"
    />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineComponent, PropType, ref, computed } from 'vue';

export default defineComponent({
  name: 'DescriptionInput',

  props: {
    description: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup(props, context) {
    const input = ref(null);

    const description_ = computed({
      get: () => props.description,
      set: (value: string) => {
        if (value !== props.description) {
          context.emit('description-change', value);
        }
      }
    });

    const handleFocus = () => {
      context.emit('description-input-focus');
    };

    const handleBlur = () => {
      context.emit('description-input-blur');
    };

    const handleEnter = () => {
      context.emit('index-input', description_.value);
    };

    const focus = () => {
      (input.value as any).focus();
    };

    return {
      input,
      description_,
      handleFocus,
      handleBlur,
      handleEnter,
      focus
    };
  }
})
</script>

<style scoped>
.description-input {
  width: 400px;
  padding: 5px;
  font-size: var(--font-size);
}
</style>
