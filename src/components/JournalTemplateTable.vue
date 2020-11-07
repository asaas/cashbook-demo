<template>
  <table class="journal-template-table" v-if="visible_">
    <tr v-for="(jt, i) in journalTemplates" :key="jt.id">
      <td @click="handleItemClick(jt)">{{`-${i + 1} ${jt.description}`}}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, watch } from 'vue';

import { JournalTemplate } from '../types/journal-template';

interface State {
  visible_: boolean;
  timeoutId: number | null;
}

export default defineComponent({
  name: 'JournalTemplateTable',

  props: {
    journalTemplates: {
      type: Array as PropType<readonly JournalTemplate[]>,
      required: true
    },
    visible: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

  setup(props, context) {
    const state = reactive<State>({
      visible_: false,
      timeoutId: null
    });

    watch(
      () => props.visible,
      visible => {
        if (visible) {
          if (state.timeoutId) {
            clearTimeout(state.timeoutId);
          }

          state.visible_ = true;
        } else {
          state.timeoutId = setTimeout(() => {
            state.visible_ = false;
          }, 100);
        }
      }
    );

    const handleItemClick = (item: JournalTemplate) => {
      context.emit('item-select', item);
    };

    return {
      ...toRefs(state),
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
