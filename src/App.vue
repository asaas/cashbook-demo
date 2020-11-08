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
import { Store, initialState } from './store';

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
    const store = new Store(initialState);

    const descriptionInput = ref(null);

    store.setFocusDescriptionInput(() => {
      (descriptionInput.value as any).focus();
    })

    return {
      descriptionInput,
      ...toRefs(store.state),
      handleSelfAccountChange: store.handleSelfAccountChange.bind(store),
      handleDescriptionChange: store.handleDescriptionChange.bind(store),
      handleCorrAccountChange: store.handleCorrAccountChange.bind(store),
      handleAmountChange: store.handleAmountChange.bind(store),
      handleSubmit: store.handleSubmit.bind(store),
      handleDescriptionInputFocus: store.handleDescriptionInputFocus.bind(store),
      handleDescriptionInputBlur: store.handleDescriptionInputBlur.bind(store),
      handleItemSelect: store.handleItemSelect.bind(store),
      handleIndexInput: store.handleIndexInput.bind(store)
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
