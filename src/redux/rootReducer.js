import { combineReducers } from 'redux';
import { reducer as singInReducer } from './SignIn/reducer';
import { reducer as homeReducer } from './Home/reducer';
import { reducer as conversationReducer } from './Conversation/reducer';
import { reducer as chatRoomReducer } from './ChatRoom/reducer';
import { SIGNIN_REDUCER_KEY } from './SignIn/const';
import { HOME_REDUCER_KEY } from './Home/const';
import { CONVERSATION_REDUCER_KEY } from './Conversation/const';
import { CHAT_ROOM_REDUCER_KEY } from './ChatRoom/const';



export default combineReducers({
  [SIGNIN_REDUCER_KEY]: singInReducer,
  [HOME_REDUCER_KEY]: homeReducer,
  [CONVERSATION_REDUCER_KEY]: conversationReducer,
  [CHAT_ROOM_REDUCER_KEY]: chatRoomReducer
});