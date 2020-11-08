import { reactive } from 'vue';

import Action from './Action';
import { JournalTemplate } from '../types/journal-template';

export interface State {
  description: string;
  corrAccountId: number;
  amount: string;
  focusDescriptionInput: (() => void) | null;
}

export class JournalFormStore {
  public state: Readonly<State>;
  private _state: State;

  constructor(initialState: State) {
    this._state = reactive(initialState);
    this.state = this._state;
  }

  update(action: Action) {
    switch (action.type) {
      case 'ChangeDescription':
        this._state.description = action.description;
        break;

      case 'ChangeCorrAccount':
        this._state.corrAccountId = action.corrAccountId;
        break;

      case 'ChangeAmount':
        this._state.amount = action.amount;
        break;

      case 'ApplyJournalTemplate':
        this._state.description = action.template.description;
        this._state.corrAccountId = action.template.corrAccountId;
        this._state.amount = action.template.amount;
        break;

      case 'SubmitJournalForm':
        this._state.description = '';
        this._state.corrAccountId = 1;
        this._state.amount = '';
        break;

      default:
        break;
    }
  }
}

export const initialState = reactive<State>({
  description: '',
  corrAccountId: 1,
  amount: '',
  focusDescriptionInput: null
});

export const journalFormStore = new JournalFormStore(initialState);
