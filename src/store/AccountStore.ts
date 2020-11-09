/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { reactive } from 'vue';

import { Account } from '../types/account';

export interface State {
  accounts: readonly Account[];
}

export class AccountStore {
  public state: State;

  constructor(initialState: State) {
    this.state = reactive(initialState);
  }

  findAccountById(id: number): Account {
    return this.state.accounts.find(_ => _.id === id)!;
  }
}

export const initialState = reactive<State>({
  accounts: [
    { id: 1, name: '現金' },
    { id: 2, name: '預金' },
    { id: 3, name: '売上' },
    { id: 4, name: '仕入' },
    { id: 5, name: '給料' },
    { id: 6, name: '雑収入' }
  ]
});

export const accountStore = new AccountStore(initialState);
