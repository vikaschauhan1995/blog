import { SERCHED_USER_LIST__KEY__, SET_SEARCHED_USER_LIST, SET_USER_CHAT_LIST, USER_CHAT_LIST__KEY__ } from "./const";


export const initialState = {
  [SERCHED_USER_LIST__KEY__]: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCHED_USER_LIST:
      return { ...state, [SERCHED_USER_LIST__KEY__]: action.payload }
    case SET_USER_CHAT_LIST:
      return { ...state, [USER_CHAT_LIST__KEY__]: action.payload };
    default:
      return state;
  }
}