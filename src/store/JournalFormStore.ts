import { reactive } from 'vue';

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

  setDescription(description: string) {
    this._state.description = description;
  }

  setCorrAccountId(id: number) {
    this._state.corrAccountId = id;
  }

  setAmount(amount: string) {
    this._state.amount = amount;
  }

  setTemplateToForm(item: JournalTemplate) {
    this._state.description = item.description;
    this._state.corrAccountId = item.corrAccountId;
    this._state.amount = item.amount;

    if (this.state.focusDescriptionInput) {
      this.state.focusDescriptionInput();
    }
  }

  clearForm() {
    this._state.description = ''
    this._state.corrAccountId = 1
    this._state.amount = ''
  }

  setFocusDescriptionInput(focusDescriptionInput: () => void) {
    this._state.focusDescriptionInput = focusDescriptionInput;
  }
}

export const initialState = reactive<State>({
  description: '',
  corrAccountId: 1,
  amount: '',
  focusDescriptionInput: null
});

export const journalFormStore = new JournalFormStore(initialState);
