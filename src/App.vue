<template>
  <div class="heading">cashbook-demo</div>
  <v-spacer height="30px" />
  <div class="self-account">
    <div>自科目</div>
    <v-spacer width="5px" />
    <account-select
      :accounts="accounts"
      :account-id="selfAccountId"
      @account-change="handleSelfAccountChange"
      />
  </div>
  <v-spacer height="30px" />
  <journal-table :journals="filteredJournals" />
  <v-spacer height="30px" />
  <div class="journal-form">
    <div class="description">
      <div>摘要</div>
      <description-input
        ref="descriptionInput"
        :description="description"
        @description-change="handleDescriptionChange"
        @description-input-focus="handleDescriptionInputFocus"
        @description-input-blur="handleDescriptionInputBlur"
        @index-input="handleIndexInput"
        />
    </div>
    <v-spacer width="10px" />
    <div class="corr-account">
      <div>相手科目</div>
      <account-select
        :accounts="accounts"
        :account-id="corrAccountId"
        @account-change="handleCorrAccountChange"
        />
    </div>
    <v-spacer width="10px" />
    <div class="amount">
      <div>金額</div>
      <amount-input
        :amount="amount"
        @amount-change="handleAmountChange"
        />
    </div>
    <v-spacer width="10px" />
    <journal-form-submit-button @submit="handleSubmit" />
  </div>
  <v-spacer height="30px" />
  <journal-template-table
    ref="templateTable"
    :journal-templates="filteredJournalTemplates"
    :visible="templateTableVisible"
    @item-select="handleItemSelect"
    />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineComponent, ref, toRefs } from 'vue';

import AccountSelect from './components/AccountSelect.vue'
import JournalTable from './components/JournalTable.vue'
import DescriptionInput from './components/DescriptionInput.vue'
import AmountInput from './components/AmountInput.vue'
import JournalFormSubmitButton from './components/JournalFormSubmitButton.vue'
import JournalTemplateTable from './components/JournalTemplateTable.vue'
import VSpacer from './components/VSpacer.vue'
import { accountStore } from './store/AccountStore';
import { criteriaStore } from './store/CriteriaStore';
import { journalFormStore  } from './store/JournalFormStore';
import { journalStore } from './store/JournalStore';
import { journalTemplateStore } from './store/JournalTemplateStore';

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
    const descriptionInput = ref(null);

    const handleSelfAccountChange = (selfAccountId: number) => {
      criteriaStore.setSelfAccountId(selfAccountId);

      journalStore.filterJournalsBySelfAccountId(selfAccountId);

      journalTemplateStore.filterJournalTemplatesBySelfAccountId(selfAccountId);
    };

    const handleDescriptionChange = (description: string) => {
      journalFormStore.setDescription(description);
    };

    const handleCorrAccountChange = (corrAccountId: number) => {
      journalFormStore.setCorrAccountId(corrAccountId);
    };

    const handleAmountChange = (amount: string) => {
      journalFormStore.setAmount(amount);
    };

    const handleSubmit = () => {
      const { selfAccountId } = criteriaStore.state;
      const {
        description,
        corrAccountId,
        amount
      } = journalFormStore.state;

      const selfAccount = accountStore.findAccountById(selfAccountId);
      const corrAccount = accountStore.findAccountById(corrAccountId);

      journalStore.addJournal({
        selfAccountId: selfAccount.id,
        selfAccountName: selfAccount.name,
        corrAccountId: corrAccount.id,
        corrAccountName: corrAccount.name,
        description,
        amount
      });

      journalStore.filterJournalsBySelfAccountId(selfAccountId);

      journalFormStore.clearForm();
    };

    const handleDescriptionInputFocus = () => {
      journalTemplateStore.showTemplateTable();
    };

    const handleDescriptionInputBlur = () => {
      journalTemplateStore.hideTemplateTable();
    };

    const handleItemSelect = (id: number) => {
      const item = journalTemplateStore.findItemById(id);

      if (item) {
        journalFormStore.setTemplateToForm(item);
      }
    };

    const handleIndexInput = (index: string) => {
      const item = journalTemplateStore.findItemByIndex(index);

      if (item) {
        journalFormStore.setTemplateToForm(item);
      }
    };

    journalFormStore.setFocusDescriptionInput(() => {
      (descriptionInput.value as any).focus();
    });

    const init = () => {
      const { selfAccountId } = criteriaStore.state;

      journalStore.filterJournalsBySelfAccountId(selfAccountId);
      journalTemplateStore.filterJournalTemplatesBySelfAccountId(selfAccountId);
    };

    init();

    return {
      descriptionInput,
      ...toRefs(accountStore.state),
      ...toRefs(criteriaStore.state),
      ...toRefs(journalStore.state),
      ...toRefs(journalFormStore.state),
      ...toRefs(journalTemplateStore.state),
      handleSelfAccountChange,
      handleDescriptionChange,
      handleCorrAccountChange,
      handleAmountChange,
      handleSubmit,
      handleDescriptionInputFocus,
      handleDescriptionInputBlur,
      handleItemSelect,
      handleIndexInput
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
  line-height: 1.5;
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
