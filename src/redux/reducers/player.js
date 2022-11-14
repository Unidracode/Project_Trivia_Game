import { GET_NAME, GET_EMAIL, GET_SCORE, GET_CORRECTANS /**/ } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  timer: 0,
  correctAnswer: 0, //
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_NAME:
    return { ...state, name: action.payload };
  case GET_EMAIL:
    return { ...state, gravatarEmail: action.payload };
  case GET_SCORE:
    return { ...state, score: state.score + action.payload };
  case GET_CORRECTANS: //
    return { ...state, correctAnswer: action.payload }; //
  default:
    return state;
  }
};

export default playerReducer;
