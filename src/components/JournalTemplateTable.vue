<template>
  <table class="journal-template-table" v-if="visibilityState">
    <tr v-for="(jt, i) in filteredJournalTemplates" :key="jt.id">
      <td @click="handleItemClick(jt)">{{`-${i + 1} ${jt.description}`}}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

import { JournalTemplate } from '../types/journal-template';

interface State {
  journalTemplates: JournalTemplate[];
  filteredJournalTemplates: JournalTemplate[];
  visibilityState: boolean;
  timeoutId: number | null;
}

export default defineComponent({
  name: 'JournalTemplateTable',

  setup(_, context) {
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
      filteredJournalTemplates: [],
      visibilityState: false,
      timeoutId: null
    });

    const show = () => {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }

      state.visibilityState = true;
    };

    const hide = () => {
      state.timeoutId = setTimeout(() => {
        state.visibilityState = false;
      }, 100);
    };

    const filterJournalTemplatesBySelfAccountId = (selfAccountId: number) => {
      state.filteredJournalTemplates =
        state.journalTemplates.filter(_ => _.selfAccountId === selfAccountId);
    };

    const findJournalTemplatesByIndex =
      (index: string) =>
        state.filteredJournalTemplates.find((_, i) => `-${i + 1}` === index);

    const handleItemClick = (item: JournalTemplate) => {
      context.emit('item-select', item);
    };

    return {
      ...toRefs(state),
      show,
      hide,
      filterJournalTemplatesBySelfAccountId,
      findJournalTemplatesByIndex,
      handleItemClick
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
