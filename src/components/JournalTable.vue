<template>
  <table class="journal-table">
    <tr>
      <th>摘要</th>
      <th>相手科目</th>
      <th>金額</th>
    </tr>
    <tr v-for="j in journals" :key="j.id">
      <td>{{j.description}}</td>
      <td>{{j.corrAccountName}}</td>
      <td>{{j.amount}}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { Journal } from '../types/journal';

export default defineComponent({
  name: 'JournalTable',

  props: {
    journals: {
      type: Array as PropType<readonly Journal[]>,
      required: true
    }
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
