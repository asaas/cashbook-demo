<template>
  <select class="account-select" v-model="currentAccountId">
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
    modelValue: {
      type: Number as PropType<number>,
      required: true
    }
  },

  setup(props, context) {
    const currentAccountId = computed({
      get: () => props.modelValue,
      set: (value: number) => {
        if (value !== props.modelValue) {
          context.emit('update:modelValue', value);
        }
      }
    });

    return {
      currentAccountId
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
