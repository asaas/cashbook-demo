const journalForm = {
  state: () => ({
    description: '',
    corrAccountId: 1,
    amount: ''
  }),

  mutations: {
    changeDescription(state, payload) {
      state.description = payload.description;
    },

    changeCorrAccount(state, payload) {
      state.corrAccountId = payload.corrAccountId;
    },

    changeAmount(state, payload) {
      state.amount = payload.amount;
    },

    applyJournalTemplate(state, payload) {
      state.description = payload.template.description;
      state.corrAccountId = payload.template.corrAccountId;
      state.amount = payload.template.amount;
    },

    clearJournalForm(state) {
      state.description = '';
      state.corrAccountId = 1;
      state.amount = '';
    }
  }
};

export default journalForm;
