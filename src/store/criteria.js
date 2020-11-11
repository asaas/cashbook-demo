const criteria = {
  state: () => ({
    selfAccountId: 1
  }),

  mutations: {
    changeSelfAccount(state, payload) {
      state.selfAccountId = payload.selfAccountId;
    }
  }
};

export default criteria;
