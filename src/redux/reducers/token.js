import { RESULT_API } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESULT_API:
    localStorage.setItem('token', action.payload.token);
    return { ...state, token: action.payload.token };
  default:
    return state;
  }
};

export default tokenReducer;
