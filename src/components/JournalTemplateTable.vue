<template>
  <table class="journal-template-table">
    <tr v-for="(jt, i) in filteredJournalTemplates" :key="jt.id">
      <td>{{`-${i + 1} ${jt.description}`}}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

import { JournalTemplate } from '../types/journal-template';

interface State {
  journalTemplates: JournalTemplate[];
  filteredJournalTemplates: JournalTemplate[];
}

export default defineComponent({
  name: 'JournalTemplateTable',

  setup() {
    const state = reactive<State>({
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
          corrAccountId: 3,
          description: '自科目=現金, 相手科目=雑収入, 金額=3000',
          amount: '3000'
        },
        {
          id: 4,
          selfAccountId: 4,
          corrAccountId: 1,
          description: '自科目=仕入, 相手科目=現金, 金額=4000',
          amount: '4000'
        },
        {
          id: 5,
          selfAccountId: 4,
          corrAccountId: 2,
          description: '自科目=仕入, 相手科目=預金, 金額=5000',
          amount: '5000'
        },
        {
          id: 6,
          selfAccountId: 6,
          corrAccountId: 1,
          description: '自科目=雑収入, 相手科目=現金, 金額=6000',
          amount: '6000'
        }
      ],
      filteredJournalTemplates: []
    });

    const filterJournalTemplatesBySelfAccountId = (selfAccountId: number) => {
      state.filteredJournalTemplates =
        state.journalTemplates.filter(_ => _.selfAccountId === selfAccountId);
    };

    return {
      ...toRefs(state),
      filterJournalTemplatesBySelfAccountId
    };
  }
})
</script>

<style scoped>
.journal-template-table {
  border-collapse: collapse;
}

td {
  width: 400px;
  padding: 5px;
  border: 1px solid #555;
}
</style>
