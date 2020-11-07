<template>
  <select class="account-select" v-model="currentAccountId">
    <option v-for="a in accounts" :value="a.id" :key="a.id">{{a.name}}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';

import { Account } from '../types/account';

interface State {
  accounts: readonly Account[];
  currentAccountId: number;
}

export default defineComponent({
  name: 'AccountSelect',

  setup(_, context) {
    const state = reactive<State>({
      accounts: [
        { id: 1, name: '現金' },
        { id: 2, name: '預金' },
        { id: 3, name: '売上' },
        { id: 4, name: '仕入' },
        { id: 5, name: '給料' },
        { id: 6, name: '雑収入' }
      ],
      currentAccountId: 1
    });

    const getCurrentAccountId = () => state.currentAccountId;

    watch(
      () => state.currentAccountId,
      currentAccountId => {
        context.emit('account-change', currentAccountId);
      }
    );

    return {
      ...toRefs(state),
      getCurrentAccountId
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
