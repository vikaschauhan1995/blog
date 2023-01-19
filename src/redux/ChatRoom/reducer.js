import { SET_CHAT_ROOM_USER__KEY__, CHAT_ROOM_USER } from "./const";


export const initialState = {
  [CHAT_ROOM_USER]: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT_ROOM_USER__KEY__:
      return { ...state, [CHAT_ROOM_USER]: action.payload }
    default:
      return state;
  }
}