import React, { useEffect, useState } from 'react';
import '../styles/components/ConversationList.scss';
import { useSelector } from 'react-redux';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { IS_USER_LOGGEDIN, SIGNIN_REDUCER_KEY, UID__KEY__ } from '../redux/SignIn/const';
import { useDispatch } from 'react-redux';
import { getChatListAction } from '../redux/Conversation/action';
import { CONVERSATION_REDUCER_KEY, USER_CHAT_LIST__KEY__ } from '../redux/Conversation/const';

const ConversationList = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const currentUsersUid = state[SIGNIN_REDUCER_KEY][IS_USER_LOGGEDIN][UID__KEY__];
  const userChatList = state[CONVERSATION_REDUCER_KEY][USER_CHAT_LIST__KEY__];
  useEffect(() => {
    dispatch(getChatListAction(currentUsersUid));
  }, []);
  // console.log("chats userChatList=> ", userChatList);
  if (userChatList?.length > 0) {
    return (
      <div>
        {
          userChatList?.map((chat) => {
            return (
              <div className="SearchConversationUserList__userList_item" key={chat[0]}>
                <div className='SearchConversationUserList__userList_item_left'>
                  <img src={chat[1].userInfo.photoURL} alt="" referrerPolicy="no-referrer" />
                </div>
                <div className="SearchConversationUserList__userList_item_right">
                  <div>
                    {chat[1].userInfo.displayName}<br />
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
