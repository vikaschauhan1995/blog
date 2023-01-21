import React from 'react';
import '../../styles/components/ChatHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { CHAT_ROOM_REDUCER_KEY, CHAT_ROOM_USER } from '../../redux/ChatRoom/const';
import { PHOTO_URL__KEY__, DISPLAY_NAME__KEY__ } from '../../redux/SignIn/const';
import { defaultImage } from '../../static/const';

const ChatHeader = () => {
  const state = useSelector(state => state);
  const chatRoomUser = state?.[CHAT_ROOM_REDUCER_KEY][CHAT_ROOM_USER];
  // console.log("ChatHeader state", state);
  return (
    <div className="ChatHeader__container">
      <div className="ChatHeader__left">
        <img src={chatRoomUser?.[PHOTO_URL__KEY__] ? chatRoomUser?.[PHOTO_URL__KEY__] : defaultImage} alt="" referrerPolicy="no-referrer" />
      </div>
      <div className="ChatHeader__mid">
        <b>{chatRoomUser?.[DISPLAY_NAME__KEY__]}</b>
      </div>
      <div className="ChatHeader__right">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
    </div>
  )
}

export default ChatHeader
