<template>
  <input
    type="text"
    ref="input"
    class="description-input"
    v-model="description"
    @focus="handleFocus"
    @blur="handleBlur"
    @keydown.enter="handleEnter"
    />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineComponent, reactive, ref, toRefs } from 'vue';

interface State {
  description: string;
}

export default defineComponent({
  name: 'DescriptionInput',

  setup(_, context) {
    const input = ref(null);

    const state = reactive<State>({
      description: ''
    });

    const getDescription = () => state.description;

    const setDescription = (description: string) => {
      state.description = description;
    };

    const handleFocus = () => {
      context.emit('description-input-focus');
    };

    const handleBlur = () => {
      context.emit('description-input-blur');
    };

    const focus = () => {
      (input.value as any).focus();
    };

    const handleEnter = () => {
      context.emit('index-input', state.description);
    };

    return {
      input,
      ...toRefs(state),
      getDescription,
      setDescription,
      handleFocus,
      handleBlur,
      focus,
      handleEnter
    }
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
