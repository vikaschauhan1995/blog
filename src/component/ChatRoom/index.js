import React from 'react';
import '../../styles/components/ChatRoom.scss';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import { useSelector } from 'react-redux';
import { CHAT_ROOM_REDUCER_KEY, CHAT_ROOM_USER } from '../../redux/ChatRoom/const';
import EmptyChatRoom from './EmptyChatRoom';

const ChatRoom = () => {
  const state = useSelector(state => state);
  const chatRoomUser = state?.[CHAT_ROOM_REDUCER_KEY][CHAT_ROOM_USER];
  // console.log("ChatRoom state", chatRoomUser);
  if (chatRoomUser) {
    return (
      <div className='ChatRoom__container'>
        <div className='ChatRoom__innnerContainer'>
          <div className='ChatRoom__header'>

          </div>
          <div className='ChatRoom__body'>
            <ChatBody />
          </div>
          <div className='ChatRoom__footer'>
            <ChatFooter />
          </div>
        </div>
      </div>
    )
  } else {
    return <EmptyChatRoom />;
  }
}

export default ChatRoom
