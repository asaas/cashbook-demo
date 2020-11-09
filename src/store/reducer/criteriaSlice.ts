import Action from '../Action';

export interface State {
  selfAccountId: number;
}

export const initialState = {
  selfAccountId: 1
};

export default function criteriaReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'ChangeSelfAccount':
      return {
        ...state,
        selfAccountId: action.selfAccountId
      };

    default:
      return state;
  }
}
