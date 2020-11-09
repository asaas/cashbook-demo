import { reactive } from 'vue';

import Action from './Action';
import { Journal } from '../types/journal';

export interface State {
  journals: readonly Journal[];
  filteredJournals: readonly Journal[];
}

export class JournalStore {
  public state: State;

  constructor(initialState: State) {
    this.state = reactive(initialState);
  }

  update(action: Action) {
    switch (action.type) {
      case 'ChangeSelfAccount':
        this.filterJournalsBySelfAccountId(action.selfAccountId);
        break;

      case 'AddJournal':
        this.state.journals =
          [...this.state.journals, { ...action.journal, id: this.state.journals.length + 1 }];
        break;

      case 'FilterJournals':
        this.filterJournalsBySelfAccountId(action.selfAccountId);
        break;

      default:
        break;
    }
  }

  private filterJournalsBySelfAccountId(selfAccountId: number) {
    this.state.filteredJournals =
      this.state.journals.filter(_ => _.selfAccountId === selfAccountId);
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
