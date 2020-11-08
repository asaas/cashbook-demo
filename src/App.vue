<template>
  <div class="heading">cashbook-demo</div>
  <v-spacer height="30px" />
  <div class="self-account">
    <div>自科目</div>
    <v-spacer width="5px" />
    <account-select
      :accounts="accounts"
      v-model="selfAccountId"
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
        v-model="description"
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
        v-model="corrAccountId"
        />
    </div>
    <v-spacer width="10px" />
    <div class="amount">
      <div>金額</div>
      <amount-input v-model="amount" />
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
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { defineComponent, reactive, ref, toRefs, computed } from 'vue';

import AccountSelect from './components/AccountSelect.vue'
import JournalTable from './components/JournalTable.vue'
import DescriptionInput from './components/DescriptionInput.vue'
import AmountInput from './components/AmountInput.vue'
import JournalFormSubmitButton from './components/JournalFormSubmitButton.vue'
import JournalTemplateTable from './components/JournalTemplateTable.vue'
import VSpacer from './components/VSpacer.vue'
import { Account } from './types/account';
import { Journal } from './types/journal';
import { JournalTemplate } from './types/journal-template';

interface State {
  accounts: readonly Account[];
  selfAccountId: number;
  journals: readonly Journal[];
  description: string;
  corrAccountId: number;
  amount: string;
  journalTemplates: readonly JournalTemplate[];
  templateTableVisible: boolean;
}

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

    const state = reactive<State>({
      accounts: [
        { id: 1, name: '現金' },
        { id: 2, name: '預金' },
        { id: 3, name: '売上' },
        { id: 4, name: '仕入' },
        { id: 5, name: '給料' },
        { id: 6, name: '雑収入' }
      ],
      selfAccountId: 1,
      journals: [
        {
          id: 1,
          selfAccountId: 1,
          selfAccountName: '現金',
          corrAccountId: 3,
          corrAccountName: '売上',
          description: '自科目=現金',
          amount: '1000'
        },
        {
          id: 2,
          selfAccountId: 1,
          selfAccountName: '現金',
          corrAccountId: 3,
          corrAccountName: '売上',
          description: '自科目=現金',
          amount: '2000'
        },
        {
          id: 3,
          selfAccountId: 1,
          selfAccountName: '現金',
          corrAccountId: 3,
          corrAccountName: '売上',
          description: '自科目=現金',
          amount: '3000'
        },
        {
          id: 4,
          selfAccountId: 1,
          selfAccountName: '現金',
          corrAccountId: 3,
          corrAccountName: '雑収入',
          description: '自科目=現金',
          amount: '4000'
        },
        {
          id: 5,
          selfAccountId: 2,
          selfAccountName: '預金',
          corrAccountId: 3,
          corrAccountName: '売上',
          description: '自科目=預金',
          amount: '5000'
        },
        {
          id: 6,
          selfAccountId: 4,
          selfAccountName: '仕入',
          corrAccountId: 1,
          corrAccountName: '現金',
          description: '自科目=仕入',
          amount: '6000'
        }
      ],
      description: '',
      corrAccountId: 1,
      amount: '',
      journalTemplates: [
        {
          id: 1,
          selfAccountId: 1,
          corrAccountId: 3,
          description: '自科目=現金, 相手科目=売上, 金額=1000',
          amount: '1000'
        },
        {
          id: 2,
          selfAccountId: 1,
          corrAccountId: 3,
          description: '自科目=現金, 相手科目=売上, 金額=2000',
          amount: '2000'
        },
        {
          id: 3,
          selfAccountId: 1,
          corrAccountId: 6,
          description: '自科目=現金, 相手科目=雑収入, 金額=3000',
          amount: '3000'
        },
        {
          id: 4,
          selfAccountId: 4,
          corrAccountId: 1,
          description: 'test1',
          amount: '4000'
        },
        {
          id: 5,
          selfAccountId: 4,
          corrAccountId: 2,
          description: 'test2',
          amount: '5000'
        },
        {
          id: 6,
          selfAccountId: 6,
          corrAccountId: 1,
          description: 'test3',
          amount: '6000'
        }
      ],
      templateTableVisible: false
    });

    const filteredJournals = computed(() => (
      state.journals.filter(_ => _.selfAccountId === state.selfAccountId)
    ));

    const filteredJournalTemplates = computed(() => (
      state.journalTemplates.filter(_ => _.selfAccountId === state.selfAccountId)
    ));

    const selfAccount = computed(() => (
      state.accounts.find(_ => _.id === state.selfAccountId)!
    ));

    const corrAccount = computed(() => (
      state.accounts.find(_ => _.id === state.corrAccountId)!
    ));

    const addJournal = (journal: Omit<Journal, 'id'>) => {
      state.journals = [...state.journals, { ...journal, id: state.journals.length + 1 }];
    }

    const clearForm = () => {
      state.description = ''
      state.corrAccountId = 1
      state.amount = ''
    };

    const handleSubmit = () => {
      const {
        description,
        amount
      } = state;

      addJournal({
        selfAccountId: selfAccount.value.id,
        selfAccountName: selfAccount.value.name,
        corrAccountId: corrAccount.value.id,
        corrAccountName: corrAccount.value.name,
        description,
        amount
      });

      clearForm();
    };

    const handleDescriptionInputFocus = () => {
      state.templateTableVisible = true;
    };

    const handleDescriptionInputBlur = () => {
      state.templateTableVisible = false;
    };

    const setTemplateToForm = (item: JournalTemplate) => {
      state.description = item.description;
      state.corrAccountId = item.corrAccountId;
      state.amount = item.amount;

      (descriptionInput.value as any).focus();
    };

    const handleItemSelect = (id: number) => {
      const item = state.journalTemplates.find(_ => _.id === id);

      if (item) {
        setTemplateToForm(item);
      }
    };

    const handleIndexInput = (index: string) => {
      const item = filteredJournalTemplates.value.find((_, i) => `-${i + 1}` === index);

      if (item) {
        setTemplateToForm(item);
      }
    };

    return {
      descriptionInput,
      ...toRefs(state),
      filteredJournals,
      filteredJournalTemplates,
      selfAccount,
      corrAccount,
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
