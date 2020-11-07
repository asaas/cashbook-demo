<template>
  <div class="heading">cashbook-demo</div>
  <v-spacer height="30px" />
  <account-select />
  <v-spacer height="30px" />
  <description-input />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AccountSelect from './components/AccountSelect.vue'
import DescriptionInput from './components/DescriptionInput.vue'
import VSpacer from './components/VSpacer.vue'

export default defineComponent({
  name: 'App',

  components: {
    AccountSelect,
    DescriptionInput,
    VSpacer
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

:root {
  --font-size: 15px;
}

.heading {
  font-size: var(--font-size);
}
</style>
