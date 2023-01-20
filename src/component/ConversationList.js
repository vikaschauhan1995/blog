import React, { useEffect, useState } from 'react';
import '../styles/components/ConversationList.scss';
import { useSelector } from 'react-redux';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { DISPLAY_NAME__KEY__, IS_USER_LOGGEDIN, PHOTO_URL__KEY__, SIGNIN_REDUCER_KEY, UID__KEY__ } from '../redux/SignIn/const';
import { useDispatch } from 'react-redux';
import { clickToOpenChatRoomAction, getChatListAction, setUserChatListAction } from '../redux/Conversation/action';
import { CONVERSATION_REDUCER_KEY, USER_CHAT_LIST__KEY__, USER_CHAT__KEY__, USER_INFO__KEY__ } from '../redux/Conversation/const';

const ConversationList = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const currentUsersUid = state[SIGNIN_REDUCER_KEY][IS_USER_LOGGEDIN][UID__KEY__];
  const userChatList = state[CONVERSATION_REDUCER_KEY][USER_CHAT_LIST__KEY__];
  useEffect(() => {
    // dispatch(getChatListAction(currentUsersUid));
    onSnapshot(doc(db, USER_CHAT__KEY__, currentUsersUid), (doc) => {
      // console.log(`Received doc snapshot:`, doc.data());
      if (doc.data()) {
        dispatch(setUserChatListAction(doc.data().list));
      } else {
        dispatch(setUserChatListAction([]));
      }
    });
  }, []);
  // console.log("chats userChatList=> ", userChatList);
  if (userChatList?.length > 0) {
    return (
      <div>
        {
          userChatList?.map((chat) => {
            return (
              <div className="SearchConversationUserList__userList_item" onClick={() => dispatch(clickToOpenChatRoomAction(chat))} key={chat?.[UID__KEY__]}>
                <div className='SearchConversationUserList__userList_item_left'>
                  <img src={chat?.[PHOTO_URL__KEY__]} alt="" referrerPolicy="no-referrer" />
                </div>
                <div className="SearchConversationUserList__userList_item_right">
                  <div>
                    {chat?.[DISPLAY_NAME__KEY__]}<br />
                    {/* <span>last message</span> */}
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    )
  } else {
    return (<div>No chat found</div>);
  }
}

export default ConversationList
