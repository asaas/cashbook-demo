import { reactive } from 'vue';

import Action from './Action';
import { JournalTemplate } from '../types/journal-template';

export interface State {
  journalTemplates: readonly JournalTemplate[];
  filteredJournalTemplates: readonly JournalTemplate[];
  templatesVisible: boolean;
}

export class JournalTemplateStore {
  public state: Readonly<State>;
  private _state: State;

  constructor(initialState: State) {
    this._state = reactive(initialState);
    this.state = this._state;
  }

  update(action: Action) {
    switch (action.type) {
      case 'ChangeSelfAccount':
        this.filterJournalTemplatesBySelfAccountId(action.selfAccountId);
        break;

      case 'ShowJournalTemplates':
        this._state.templatesVisible = true;
        break;

      case 'HideJournalTemplates':
        this._state.templatesVisible = false;
        break;

      default:
        break;
    }
  }

  findJournalTemplateById(id: number): JournalTemplate | null {
    return this.state.journalTemplates.find(_ => _.id === id) ?? null;
  }

  findJournalTemplateByIndex(index: string): JournalTemplate | null {
    return this.state.filteredJournalTemplates.find((_, i) => `-${i + 1}` === index) ?? null;
  }

  private filterJournalTemplatesBySelfAccountId(selfAccountId: number) {
    this._state.filteredJournalTemplates =
      this.state.journalTemplates.filter(_ => _.selfAccountId === selfAccountId);
  }
}

export const initialState = reactive<State>({
  journalTemplates: [
    {
      id: 1,
      selfAccountId: 1,
      corrAccountId: 3,
      description: '自科目=現金, 相手科目=売上, 金額=1000',
      amount: '1000'
    },
    {
      id: 2,
      selfAccountId: 1,
      corrAccountId: 3,
      description: '自科目=現金, 相手科目=売上, 金額=2000',
      amount: '2000'
    },
    {
      id: 3,
      selfAccountId: 1,
      corrAccountId: 6,
      description: '自科目=現金, 相手科目=雑収入, 金額=3000',
      amount: '3000'
    },
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
    },
    {
      id: 6,
      selfAccountId: 6,
      corrAccountId: 1,
      description: 'test3',
      amount: '6000'
    }
  ],
  filteredJournalTemplates: [],
  templatesVisible: false
});

export const journalTemplateStore = new JournalTemplateStore(initialState);
