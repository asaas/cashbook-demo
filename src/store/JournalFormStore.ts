import { reactive } from 'vue';

import { JournalTemplate } from '../types/journal-template';

export interface State {
  description: string;
  corrAccountId: number;
  amount: string;
  focusDescriptionInput: (() => void) | null;
}

export class JournalFormStore {
  public state: State;

  constructor(initialState: State) {
    this.state = reactive(initialState);
  }

  setDescription(description: string) {
    this.state.description = description;
  }

  setCorrAccountId(id: number) {
    this.state.corrAccountId = id;
  }

  setAmount(amount: string) {
    this.state.amount = amount;
  }

  setTemplateToForm(item: JournalTemplate) {
    this.state.description = item.description;
    this.state.corrAccountId = item.corrAccountId;
    this.state.amount = item.amount;

    if (this.state.focusDescriptionInput) {
      this.state.focusDescriptionInput();
    }
  }

  clearForm() {
    this.state.description = ''
    this.state.corrAccountId = 1
    this.state.amount = ''
  }

  setFocusDescriptionInput(focusDescriptionInput: () => void) {
    this.state.focusDescriptionInput = focusDescriptionInput;
  }
}

export const initialState = reactive<State>({
  description: '',
  corrAccountId: 1,
  amount: '',
  focusDescriptionInput: null
});

export const journalFormStore = new JournalFormStore(initialState);
