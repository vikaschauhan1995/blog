import React from 'react';
import '../../styles/components/ChatRoom.scss';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';

const ChatRoom = () => {
  return (
    <div className='ChatRoom__container'>
      <div className='ChatRoom__innnerContainer'>
        <div className='ChatRoom__header'>
          <ChatHeader />
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
}

export default ChatRoom
