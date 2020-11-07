<template>
  <input
    type="text"
    class="description-input"
    v-model="description"
    @keydown.enter="handleEnter"
    />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

interface State {
  description: string;
}

export default defineComponent({
  name: 'DescriptionInput',

  setup(_, context) {
    const state = reactive<State>({
      description: ''
    });

    const getDescription = () => state.description;

    const setDescription = (description: string) => {
      state.description = description;
    };

    const handleEnter = () => {
      context.emit('index-input', state.description);
    };

    return {
      ...toRefs(state),
      getDescription,
      setDescription,
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
