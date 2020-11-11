function filterJournalTemplatesBySelfAccountId(
  selfAccountId,
  templates
) {
  return templates.filter(_ => _.selfAccountId === selfAccountId);
}

const journalTemplates = {
  state: () => ({
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
    templatesVisible: false
  }),

  mutations: {
    changeSelfAccount(state, payload) {
      state.filteredJournalTemplates = filterJournalTemplatesBySelfAccountId(
        payload.selfAccountId,
        state.journalTemplates
      );
    },

    showJournalTemplates(state) {
      state.templatesVisible = true;
    },

    hideJournalTemplates(state) {
      state.templatesVisible = false;
    }
  }
};

export default journalTemplates;
