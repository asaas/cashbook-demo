<template>
  <div class="heading">cashbook-demo</div>
  <v-spacer height="30px" />
  <div class="self-account">
    <div>自科目</div>
    <v-spacer width="5px" />
    <account-select
      ref="selfAccount"
      @account-change="handleSelfAccountChange"
      />
  </div>
  <v-spacer height="30px" />
  <journal-table ref="journals" />
  <v-spacer height="30px" />
  <div class="journal-form">
    <div class="description">
      <div>摘要</div>
      <description-input />
    </div>
    <v-spacer width="10px" />
    <div class="corr-account">
      <div>相手科目</div>
      <account-select />
    </div>
    <v-spacer width="10px" />
    <div class="amount">
      <div>金額</div>
      <amount-input />
    </div>
    <v-spacer width="10px" />
    <journal-form-submit-button />
  </div>
  <v-spacer height="30px" />
  <journal-template-table />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineComponent, ref, nextTick } from 'vue';

import AccountSelect from './components/AccountSelect.vue'
import JournalTable from './components/JournalTable.vue'
import DescriptionInput from './components/DescriptionInput.vue'
import AmountInput from './components/AmountInput.vue'
import JournalFormSubmitButton from './components/JournalFormSubmitButton.vue'
import JournalTemplateTable from './components/JournalTemplateTable.vue'
import VSpacer from './components/VSpacer.vue'

export default defineComponent({
  name: 'App',

  components: {
    AccountSelect,
    JournalTable,
    DescriptionInput,
    AmountInput,
    JournalFormSubmitButton,
    JournalTemplateTable,
    VSpacer
  },

  setup() {
    const selfAccount = ref(null);
    const journals = ref(null);

    const handleSelfAccountChange = (selfAccountId: number) => {
      (journals.value as any).filterJournalsBySelfAccountId(selfAccountId);
    };

    nextTick(() => {
      const selfAccountId = (selfAccount.value as any).getCurrentAccountId();

      (journals.value as any).filterJournalsBySelfAccountId(selfAccountId);
    });

    return {
      selfAccount,
      journals,
      handleSelfAccountChange
    };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

:root {
  --font-size: 15px;
  font-size: var(--font-size);
}

.heading {
  font-size: var(--font-size);
}

.self-account {
  display: flex;
  align-items: center;
}

.journal-form {
  display: flex;
  align-items: flex-end;
}
</style>
