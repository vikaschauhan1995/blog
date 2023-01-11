import { IS_USER_LOGGEDIN, SET_USER_LOGGEDIN } from './const';

export const initialState = {
  [IS_USER_LOGGEDIN]: null
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGGEDIN:
      return { ...state, [IS_USER_LOGGEDIN]: action.payload }
    default:
      return state;
  }
}