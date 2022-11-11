export const RESULT_API = 'RESULT_API';
export const GET_NAME = 'GET_NAME';
export const GET_EMAIL = 'GET_EMAIL';
export const GET_TIMER = 'GET_TIMER';

export const getName = (payload) => ({
  type: GET_NAME,
  payload,
});

export const getEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});

export const getTimer = (payload) => ({
  type: GET_TIMER,
  payload,
});
