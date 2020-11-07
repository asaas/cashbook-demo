<template>
  <button
    class="journal-form-submit-button"
    @click="handleClick"
    >
    入力
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JournalFormSubmitButton',

  setup(_, context) {
    const handleClick = () => {
      context.emit('submit');
    };

    return {
      handleClick
    };
  }
})
</script>

<style scoped>
.journal-form-submit-button {
  width: 100px;
  font-size: var(--font-size);
}
</style>
