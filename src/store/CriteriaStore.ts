import { reactive } from 'vue';

import Action from './Action';

export interface State {
  selfAccountId: number;
}

export class CriteriaStore {
  public state: State;

  constructor(initialState: State) {
    this.state = reactive(initialState);
  }

  update(action: Action) {
    switch (action.type) {
      case 'ChangeSelfAccount':
        this.state.selfAccountId = action.selfAccountId;
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
