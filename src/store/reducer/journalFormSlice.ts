import Action from '../Action';

export interface State {
  description: string;
  corrAccountId: number;
  amount: string;
}

export const initialState = {
  description: '',
  corrAccountId: 1,
  amount: ''
};

export default function journalFormReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'ChangeDescription':
      return {
        ...state,
        description: action.description
      };

    case 'ChangeCorrAccount':
      return {
        ...state,
        corrAccountId: action.corrAccountId
      };

    case 'ChangeAmount':
      return {
        ...state,
        amount: action.amount
      };

    case 'ApplyJournalTemplate':
      return {
        ...state,
        description: action.template.description,
        corrAccountId: action.template.corrAccountId,
        amount: action.template.amount
      };

    case 'ClearJournalForm':
      return {
        ...state,
        description: '',
        corrAccountId: 1,
        amount: ''
      };

    default:
      return state;
  }
}
