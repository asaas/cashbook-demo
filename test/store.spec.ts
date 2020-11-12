import { describe, it } from 'mocha';
import { expect } from 'chai';
import { nextTick } from 'vue';

import { Store, initialState } from '../src/store';

describe('store', () => {
  describe('handleSelfAccountChange', async () => {
    it('should change selfAccount and filter journals and filter journal templates', async () => {
      const store = new Store(initialState);

      store.handleSelfAccountChange(4);

      await nextTick();

      expect(store.state).to.deep.equal({
        ...initialState,
        selfAccountId: 4,
        selfAccount: { id: 4, name: '仕入' },
        filteredJournals: [
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
        filteredJournalTemplates: [
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
          }
        ]
      });
    });
  });

  describe('handleSubmit', async () => {
    it('should add a journal to journals and clear form', async () => {
      const state = {
        ...initialState,
        selfAccountId: 4,
        selfAccount: { id: 4, name: '仕入' },
        description: 'test',
        corrAccountId: 2,
        corrAccount: { id: 2, name: '預金' },
        amount: '1000000',
        filteredJournals: [
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
        filteredJournalTemplates: [
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
          }
        ]
      };

      const store = new Store(state);

      store.handleSubmit();

      await nextTick();

      expect(store.state).to.deep.equal({
        ...state,
        description: '',
        corrAccountId: 1,
        corrAccount: { id: 1, name: '現金' },
        amount: '',
        journals: [
          ...state.journals,
          {
            id: 7,
            selfAccountId: 4,
            selfAccountName: '仕入',
            corrAccountId: 2,
            corrAccountName: '預金',
            description: 'test',
            amount: '1000000'
          }
        ],
        filteredJournals: [
          ...state.filteredJournals,
          {
            id: 7,
            selfAccountId: 4,
            selfAccountName: '仕入',
            corrAccountId: 2,
            corrAccountName: '預金',
            description: 'test',
            amount: '1000000'
          }
        ],
      });
    });
  });
});
