import Action from '../Action';
import { Journal } from '../../types/journal';

export interface State {
  journals: readonly Journal[];
  filteredJournals: readonly Journal[];
}

const initialState = {
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
};

function filterJournalsBySelfAccountId(
  selfAccountId: number,
  journals: readonly Journal[]
): readonly Journal[] {
  return journals.filter(_ => _.selfAccountId === selfAccountId);
}

function addJournal(
  journalToAdd: Omit<Journal, 'id'>,
  journals: readonly Journal[]
): readonly Journal[] {
  return [...journals, { ...journalToAdd, id: journals.length + 1 }];
}

export default function journalsReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'ChangeSelfAccount':
      return {
        ...state,
        filteredJournals: filterJournalsBySelfAccountId(action.selfAccountId, state.journals)
      };

    case 'AddJournal':
      return {
        ...state,
        journals: addJournal(action.journal, state.journals),
      };

    case 'FilterJournals':
      return {
        ...state,
        filteredJournals: filterJournalsBySelfAccountId(action.selfAccountId, state.journals)
      };

    default:
      return state;
  }
}
