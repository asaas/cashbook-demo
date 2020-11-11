import { createStore } from 'vuex';

import accounts from './accounts';
import criteria from './criteria';
import journals from './journals';
import journalForm from './journalForm';
import journalTemplates from './journalTemplates';

function findAccountById(id, accounts) {
  return accounts.find(_ => _.id === id);
}

function findJournalTemplateById(id, templates) {
  return templates.find(_ => _.id === id);
}

function findJournalTemplateByIndex(index, templates) {
  return templates.find((_, i) => `-${i + 1}` === index);
}

export default createStore({
  modules: {
    accounts,
    criteria,
    journals,
    journalForm,
    journalTemplates
  },

  actions: {
    submitJournalForm({ state, commit }) {
      const { selfAccountId } = state.criteria;
      const {
        description,
        corrAccountId,
        amount
      } = state.journalForm;
      const { accounts } = state.accounts;
      const selfAccount = findAccountById(selfAccountId, accounts);
      const corrAccount = findAccountById(corrAccountId, accounts);
      const { name:selfAccountName } = selfAccount;
      const { name:corrAccountName } = corrAccount;

      const journal = {
        selfAccountId,
        selfAccountName,
        corrAccountId,
        corrAccountName,
        description,
        amount
      };

      commit('addJournal', { journal });
      commit('filterJournals', { selfAccountId });
      commit('clearJournalForm', { selfAccountId });
    },

    selectJournalTemplate({ state, commit }, { id }) {
      const { journalTemplates } = state.journalTemplates;
      const template = findJournalTemplateById(id, journalTemplates);

      commit('applyJournalTemplate', { template });
    },

    findJournalTemplateByIndex({ state, commit }, { index }) {
      const { filteredJournalTemplates } = state.journalTemplates;
      const template = findJournalTemplateByIndex(index, filteredJournalTemplates);

      if (template) {
        commit('applyJournalTemplate', { template });
      }
    }
  }
});
