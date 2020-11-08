import { reactive } from 'vue';

import Action from './Action';

export interface State {
  selfAccountId: number;
}

export class CriteriaStore {
  public state: Readonly<State>;
  private _state: State;

  constructor(initialState: State) {
    this._state = reactive(initialState);
    this.state = this._state;
  }

  update(action: Action) {
    switch (action.type) {
      case 'ChangeSelfAccount':
        this._state.selfAccountId = action.selfAccountId;
        break;

      default:
        break;
    }
  }
}

export const initialState = reactive<State>({
  selfAccountId: 1
});

export const criteriaStore = new CriteriaStore(initialState);
