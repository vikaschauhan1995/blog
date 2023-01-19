import { SET_CHAT_ROOM_USER__KEY__, CHAT_ROOM_USER, SET_CHAT_ROOM_CONVERSATION__KEY__, CHAT_ROOM_CONVERSATION } from "./const";


export const initialState = {
  [CHAT_ROOM_USER]: false,
  [CHAT_ROOM_CONVERSATION]: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT_ROOM_USER__KEY__:
      return { ...state, [CHAT_ROOM_USER]: action.payload }
    case SET_CHAT_ROOM_CONVERSATION__KEY__:
      return { ...state, [CHAT_ROOM_CONVERSATION]: action.payload }
    default:
      return state;
  }
}