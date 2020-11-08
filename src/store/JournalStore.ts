import { reactive } from 'vue';

import { Journal } from '../types/journal';

export interface State {
  journals: readonly Journal[];
  filteredJournals: readonly Journal[];
}

export class JournalStore {
  public state: Readonly<State>;
  private _state: State;

  constructor(initialState: State) {
    this._state = reactive(initialState);
    this.state = this._state;
  }

  filterJournalsBySelfAccountId(selfAccountId: number) {
    this._state.filteredJournals =
      this.state.journals.filter(_ => _.selfAccountId === selfAccountId);
  }

  addJournal(journal: Omit<Journal, 'id'>) {
    this._state.journals =
      [...this.state.journals, { ...journal, id: this.state.journals.length + 1 }];
  }
}

export const initialState = reactive<State>({
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

export const journalStore = new JournalStore(initialState);
