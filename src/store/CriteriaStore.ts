import { reactive } from 'vue';

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

  setSelfAccountId(id: number) {
    this._state.selfAccountId = id;
  }
}

export const initialState = reactive<State>({
  selfAccountId: 1
});

export const criteriaStore = new CriteriaStore(initialState);
