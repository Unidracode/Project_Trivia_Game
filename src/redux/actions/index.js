export const RESULT_API = 'RESULT_API';

export const resultAPI = (payload) => ({
  type: RESULT_API,
  payload,
});

export const getAPI = () => async (dispatch) => {
  try {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(url);
    const response = await request.json();
    // localStorage.setItem()
    dispatch(resultAPI(response));
  } catch (error) {
    throw new Error(error);
  }
};
