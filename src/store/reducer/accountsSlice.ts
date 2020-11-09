import Action from '../Action';
import { Account } from '../../types/account';

export type State = readonly Account[]

const initialState = [
  { id: 1, name: '現金' },
  { id: 2, name: '預金' },
  { id: 3, name: '売上' },
  { id: 4, name: '仕入' },
  { id: 5, name: '給料' },
  { id: 6, name: '雑収入' }
];

export default function accountsReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    default:
      return state;
  }
}
