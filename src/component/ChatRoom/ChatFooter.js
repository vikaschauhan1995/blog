import React from 'react';
import '../../styles/components/ChatFooter.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperclip, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ChatFooter = () => {
  return (
    <div className="ChatFooter__container">
      <div className='ChatFooter__input'>
        <input type="text" placeholder="Type something..." />
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
        <div className="ChatFooter__actionSend">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  )
}

export default ChatFooter
