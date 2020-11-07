<template>
  <table class="journal-table">
    <tr>
      <th>摘要</th>
      <th>相手科目</th>
      <th>金額</th>
    </tr>
    <tr v-for="j in filteredJournals" :key="j.id">
      <td>{{j.description}}</td>
      <td>{{j.corrAccountName}}</td>
      <td>{{j.amount}}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

import { Journal } from '../types/journal';

interface State {
  journals: Journal[];
  filteredJournals: Journal[];
}

export default defineComponent({
  name: 'JournalTable',

  setup() {
    const state = reactive<State>({
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
      filteredJournals: []
    });

    const filterJournalsBySelfAccountId = (selfAccountId: number) => {
      state.filteredJournals = state.journals.filter(_ => _.selfAccountId === selfAccountId);
    };

    const addJournal = (journal: Omit<Journal, 'id'>) => {
      state.journals = [...state.journals, { ...journal, id: state.journals.length + 1 }];
    };

    return {
      ...toRefs(state),
      filterJournalsBySelfAccountId,
      addJournal
    };
  }
})
</script>

<style scoped>
.journal-table {
  border-collapse: collapse;
}

th, td {
  padding: 5px;
  border: 1px solid #555;
}

th {
  background-color: #efefef;
  font-weight: normal;
}

th:nth-child(1), td:nth-child(1) {
  width: 400px;
}

th:nth-child(2), td:nth-child(2) {
  width: 100px;
}

th:nth-child(3), td:nth-child(3) {
  width: 100px;
}
</style>
