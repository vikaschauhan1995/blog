import React, { useState } from 'react';
import '../../styles/components/ChatFooter.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperclip, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_ROOM_REDUCER_KEY, CHAT_ROOM_USER } from '../../redux/ChatRoom/const';
import { SIGNIN_REDUCER_KEY, IS_USER_LOGGEDIN, UID__KEY__ } from '../../redux/SignIn/const';
import { v4 as uuid } from 'uuid';
import { Timestamp } from 'firebase/firestore';
import { clickSendMessage } from '../../redux/ChatRoom/action';
import { combinedUid } from '../../redux/Conversation/methods/combinedUid';

const ChatFooter = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const currentUser = state[SIGNIN_REDUCER_KEY][IS_USER_LOGGEDIN];
  const chatRoomUser = state[CHAT_ROOM_REDUCER_KEY][CHAT_ROOM_USER];
  const combinedUid_ = combinedUid(currentUser[UID__KEY__], chatRoomUser[UID__KEY__])
  const [input, setInput] = useState("");
  const makeInputEmpty = () => setInput("");
  const submitFunction = () => {
    const data = {
      id: uuid(),
      text: input,
      senderUid: currentUser[UID__KEY__],
      date: Timestamp.now()
    };
    dispatch(clickSendMessage(data, combinedUid_, makeInputEmpty));
    makeInputEmpty();
  }
  const clickSubmitButton = () => {
    submitFunction();
  }
  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      submitFunction();
    }
  }
  // console.log("Timestamp.now()", Timestamp.now());
  return (
    <div className="ChatFooter__container">
      <div className='ChatFooter__input'>
        <input type="text" value={input} onKeyDown={handleKeyDown} onChange={e => setInput(e.target.value)} placeholder="Type something..." />
      </div>
      <div className="ChatFooter__actions">
        <div className="ChatFooter__action">
          <FontAwesomeIcon icon={faPaperclip} />
          <input type="file" style={{ display: 'none' }} />
        </div>
        <div className="ChatFooter__action">
          {/* <lebel htmlFor="file"> */}
          <FontAwesomeIcon icon={faImage} />
          {/* </lebel> */}
        </div>
        <div className="ChatFooter__actionSend" onClick={clickSubmitButton}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  )
}

export default ChatFooter
