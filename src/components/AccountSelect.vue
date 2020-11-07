<template>
  <select class="account-select">
    <option v-for="a in accounts" :value="a.id" :key="a.id">{{a.name}}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

import { Account } from '../types/account';

interface State {
  accounts: readonly Account[];
}

export default defineComponent({
  name: 'AccountSelect',

  setup() {
    const state = reactive<State>({
      accounts: [
        { id: 1, name: '現金' },
        { id: 2, name: '預金' },
        { id: 3, name: '売上' },
        { id: 4, name: '仕入' },
        { id: 5, name: '給料' },
        { id: 6, name: '雑収入' }
      ]
    });

    return {
      ...toRefs(state)
    };
  }
})
</script>

<style scoped>
.account-select {
  padding: 5px;
  font-size: var(--font-size);
}
</style>
