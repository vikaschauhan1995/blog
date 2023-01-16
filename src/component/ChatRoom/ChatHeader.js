import React from 'react';
import '../../styles/components/ChatHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const ChatHeader = () => {
  return (
    <div className="ChatHeader__container">
      <div className="ChatHeader__left">
        <img src="" alt="" />
      </div>
      <div className="ChatHeader__mid">
        <b>Kalye</b>
      </div>
      <div className="ChatHeader__right">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
    </div>
  )
}

export default ChatHeader
