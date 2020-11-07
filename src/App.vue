<template>
  <div class="heading">cashbook-demo</div>
  <v-spacer height="30px" />
  <div class="self-account">
    <div>自科目</div>
    <v-spacer width="5px" />
    <account-select
      ref="selfAccountSelect"
      @account-change="handleSelfAccountChange"
      />
  </div>
  <v-spacer height="30px" />
  <journal-table ref="journalTable" />
  <v-spacer height="30px" />
  <div class="journal-form">
    <div class="description">
      <div>摘要</div>
      <description-input ref="descriptionInput" />
    </div>
    <v-spacer width="10px" />
    <div class="corr-account">
      <div>相手科目</div>
      <account-select ref="corrAccountSelect" />
    </div>
    <v-spacer width="10px" />
    <div class="amount">
      <div>金額</div>
      <amount-input ref="amountInput" />
    </div>
    <v-spacer width="10px" />
    <journal-form-submit-button @submit="handleSubmit" />
  </div>
  <v-spacer height="30px" />
  <journal-template-table ref="templateTable"/>
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
    const selfAccountSelect = ref(null);
    const journalTable = ref(null);
    const descriptionInput = ref(null);
    const corrAccountSelect = ref(null);
    const amountInput = ref(null);
    const templateTable = ref(null);

    const handleSelfAccountChange = (selfAccountId: number) => {
      (journalTable.value as any).filterJournalsBySelfAccountId(selfAccountId);

      (templateTable.value as any).filterJournalTemplatesBySelfAccountId(selfAccountId);
    };

    const handleSubmit = () => {
      const selfAccount = (selfAccountSelect.value as any).getAccount();
      const corrAccount = (corrAccountSelect.value as any).getAccount();
      const description = (descriptionInput.value as any).getDescription();
      const amount = (amountInput.value as any).getAmount();

      (journalTable.value as any).addJournal({
        selfAccountId: selfAccount.id,
        selfAccountName: selfAccount.name,
        corrAccountId: corrAccount.id,
        corrAccountName: corrAccount.name,
        description,
        amount
      });

      (journalTable.value as any).filterJournalsBySelfAccountId(selfAccount.id);

      (descriptionInput.value as any).setDescription('');
      (corrAccountSelect.value as any).setAccountId(1);
      (amountInput.value as any).setAmount('');
    };

    const init = () => {
      const selfAccountId = (selfAccountSelect.value as any).getAccountId();

      (journalTable.value as any).filterJournalsBySelfAccountId(selfAccountId);

      (templateTable.value as any).filterJournalTemplatesBySelfAccountId(selfAccountId);
    }

    nextTick(init);

    return {
      selfAccountSelect,
      journalTable,
      corrAccountSelect,
      descriptionInput,
      amountInput,
      templateTable,
      handleSelfAccountChange,
      handleSubmit
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
