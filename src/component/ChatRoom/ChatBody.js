import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChatRoomConversationAction } from '../../redux/ChatRoom/action';
import { CHAT_ROOM_CONVERSATION, CHAT_ROOM_REDUCER_KEY, CHAT_ROOM_USER, CONVERSATION_MESSAGE_ID__KEY__, CONVERSATION_MESSAGE_MESSAGE_TEXT__KEY__, CONVERSATION_MESSAGE_SENDER_UID__KEY__ } from '../../redux/ChatRoom/const';
import { combinedUid } from '../../redux/Conversation/methods/combinedUid';
import { SIGNIN_REDUCER_KEY, IS_USER_LOGGEDIN, UID__KEY__ } from '../../redux/SignIn/const';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { CONVERSATION__TABLE__KEY__ } from '../../redux/Conversation/const';

const ChatBody = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const currentUser = state[SIGNIN_REDUCER_KEY][IS_USER_LOGGEDIN];
  const chatRoomUser = state?.[CHAT_ROOM_REDUCER_KEY][CHAT_ROOM_USER];
  const combinedUid_ = combinedUid(currentUser[UID__KEY__], chatRoomUser[UID__KEY__]);
  const messages = state?.[CHAT_ROOM_REDUCER_KEY][CHAT_ROOM_CONVERSATION]
  const MessagesList = ({ list }) => {
    if (list.messages?.length > 0) {
      const l = list.messages?.map((item, index) => {
        return <div key={item?.[CONVERSATION_MESSAGE_ID__KEY__] + index} className={`ChatBody__conversationRow ChatBody__conversationRow_${item?.[CONVERSATION_MESSAGE_SENDER_UID__KEY__] === currentUser[UID__KEY__] ? 'right' : 'left'}`}>
          <div
            className={`ChatBody__conversatoinRow_bubble`}>
            {item?.[CONVERSATION_MESSAGE_MESSAGE_TEXT__KEY__]}
          </div>
        </div>
      });
      return <div style={{ height: '100%', overflow: 'scroll' }}><div style={{ height: '200px' }}>{l}</div></div>;
    } else {
      return <div>No Conversation</div>;
    }
  }
  useEffect(() => {
    onSnapshot(doc(db, CONVERSATION__TABLE__KEY__, combinedUid_), (doc) => {
      if (doc.data()) {
        dispatch(setChatRoomConversationAction(doc.data()));
      }
    });
  }, [chatRoomUser]);
  // console.log("messageSnapshot", messageSnapshot);
  return (
    <div style={{ height: '100%' }}>
      <MessagesList list={messages} />
    </div>
  )
}

export default ChatBody;
