<template>
  <div class="heading">cashbook-demo</div>
  <v-spacer height="30px" />
  <account-select />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AccountSelect from './components/AccountSelect.vue'
import VSpacer from './components/VSpacer.vue'

export default defineComponent({
  name: 'App',

  components: {
    AccountSelect,
    VSpacer
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

:root {
  --font-size: 20px;
}

.heading {
  font-size: var(--font-size);
}
</style>
