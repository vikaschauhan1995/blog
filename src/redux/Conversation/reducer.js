import { SERCHED_USER_LIST__KEY__, SET_SEARCHED_USER_LIST } from "./const";


export const initialState = {
  [SERCHED_USER_LIST__KEY__]: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCHED_USER_LIST:
      return { ...state, [SERCHED_USER_LIST__KEY__]: action.payload }
    default:
      return state;
  }
}