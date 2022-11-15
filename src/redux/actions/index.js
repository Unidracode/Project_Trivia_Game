export const RESULT_API = 'RESULT_API';
export const GET_NAME = 'GET_NAME';
export const GET_EMAIL = 'GET_EMAIL';
export const GET_SCORE = 'GET_SCORE';
export const GET_CORRECTANS = 'GET_CORRECTANS';
export const GET_PLAYERS = 'GET_PLAYERS';
export const RESET_GAME = 'RESET_GAME';

export const getName = (payload) => ({
  type: GET_NAME,
  payload,
});

export const getEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});

export const getScore = (payload) => ({
  type: GET_SCORE,
  payload,
});

export const getCorrectAnswer = (payload) => ({
  type: GET_CORRECTANS,
  payload,
});

export const resetGame = () => ({
  type: RESET_GAME,
});
