<template>
  <select class="account-select" v-model="accountId_">
    <option v-for="a in accounts" :value="a.id" :key="a.id">{{a.name}}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

import { Account } from '../types/account';

export default defineComponent({
  name: 'AccountSelect',

  props: {
    accounts: {
      type: Array as PropType<readonly Account[]>,
      required: true
    },
    accountId: {
      type: Number as PropType<number>,
      required: true
    }
  },

  setup(props, context) {
    const accountId_ = computed({
      get: () => props.accountId,
      set: (value: number) => {
        if (value !== props.accountId) {
          context.emit('account-change', value);
        }
      }
    });

    return {
      accountId_
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
