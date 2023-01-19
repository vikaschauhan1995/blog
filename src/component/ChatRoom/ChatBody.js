import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChatRoomConversationAction } from '../../redux/ChatRoom/action';
import { CHAT_ROOM_CONVERSATION, CHAT_ROOM_REDUCER_KEY, CHAT_ROOM_USER } from '../../redux/ChatRoom/const';
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
        return <div key={item?.id + index}>{item?.text}</div>
      });
      return l;
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
  }, []);
  // console.log("messageSnapshot", messageSnapshot);
  return (
    <div>
      <MessagesList list={messages} />
    </div>
  )
}

export default ChatBody;
