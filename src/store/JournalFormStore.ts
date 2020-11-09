import { reactive } from 'vue';

import Action from './Action';

export interface State {
  description: string;
  corrAccountId: number;
  amount: string;
}

export class JournalFormStore {
  public state: State;

  constructor(initialState: State) {
    this.state = reactive(initialState);
  }

  update(action: Action) {
    switch (action.type) {
      case 'ChangeDescription':
        this.state.description = action.description;
        break;

      case 'ChangeCorrAccount':
        this.state.corrAccountId = action.corrAccountId;
        break;

      case 'ChangeAmount':
        this.state.amount = action.amount;
        break;

      case 'ApplyJournalTemplate':
        this.state.description = action.template.description;
        this.state.corrAccountId = action.template.corrAccountId;
        this.state.amount = action.template.amount;
        break;

      case 'SubmitJournalForm':
        this.state.description = '';
        this.state.corrAccountId = 1;
        this.state.amount = '';
        break;

      default:
        break;
    }
  }
}

export const initialState = reactive<State>({
  description: '',
  corrAccountId: 1,
  amount: ''
});

export const journalFormStore = new JournalFormStore(initialState);
