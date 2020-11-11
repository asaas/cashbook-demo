function filterJournalsBySelfAccountId(
  selfAccountId,
  journals
) {
  return journals.filter(_ => _.selfAccountId === selfAccountId);
}

function addJournal(
  journalToAdd,
  journals
) {
  return [...journals, { ...journalToAdd, id: journals.length + 1 }];
}

const journals = {
  state: () => ({
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
  }),

  mutations: {
    changeSelfAccount(state, payload) {
      state.filteredJournals =
        filterJournalsBySelfAccountId(payload.selfAccountId, state.journals);
    },

    addJournal(state, payload) {
      state.journals = addJournal(payload.journal, state.journals);
    },

    filterJournals(state, payload) {
      state.filteredJournals =
        filterJournalsBySelfAccountId(payload.selfAccountId, state.journals);
    }
  }
};

export default journals;
