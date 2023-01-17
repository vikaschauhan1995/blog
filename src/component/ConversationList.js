import React, { useEffect, useState } from 'react';
import '../styles/components/ConversationList.scss';
import { useSelector } from 'react-redux';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { IS_USER_LOGGEDIN, SIGNIN_REDUCER_KEY, UID__KEY__ } from '../redux/SignIn/const';

const ConversationList = () => {
  const state = useSelector(state => state);
  const [chats, setChats] = useState([]);
  const currentUsersUid = state[SIGNIN_REDUCER_KEY][IS_USER_LOGGEDIN][UID__KEY__];
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChat", currentUsersUid), (doc) => {
      // console.log(`Received doc snapshot:`, doc.data());
      if (doc.data()) {
        setChats(doc.data());
      }
    });
    return () => {
      unsub();
    }
  }, [currentUsersUid]);
  // console.log("chats => ", Object?.entries(chats));
  return (
    <div>
      {
        Object?.entries(chats)?.map((chat) => {
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
}

export default ConversationList
