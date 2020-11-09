import { reactive } from 'vue';

export interface State {
  selfAccountId: number;
}

export class CriteriaStore {
  public state: State;

  constructor(initialState: State) {
    this.state = reactive(initialState);
  }

  setSelfAccountId(id: number) {
    this.state.selfAccountId = id;
  }
}

export const initialState = reactive<State>({
  selfAccountId: 1
});

export const criteriaStore = new CriteriaStore(initialState);
