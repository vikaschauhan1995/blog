import React, { useState } from 'react';
import '../../styles/components/ChatFooter.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperclip, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_ROOM_REDUCER_KEY, CHAT_ROOM_USER } from '../../redux/ChatRoom/const';
import { SIGNIN_REDUCER_KEY, IS_USER_LOGGEDIN, UID__KEY__ } from '../../redux/SignIn/const';
import { v4 as uuid } from 'uuid';
import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { clickSendMessage } from '../../redux/ChatRoom/action';
import { combinedUid } from '../../redux/Conversation/methods/combinedUid';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../firebase/firebase';
import { CONVERSATION__TABLE__KEY__ } from '../../redux/Conversation/const';


const ChatFooter = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const currentUser = state[SIGNIN_REDUCER_KEY][IS_USER_LOGGEDIN];
  const chatRoomUser = state[CHAT_ROOM_REDUCER_KEY][CHAT_ROOM_USER];
  const combinedUid_ = combinedUid(currentUser[UID__KEY__], chatRoomUser[UID__KEY__])
  const [input, setInput] = useState("");
  const [imageInput, setImageInput] = useState(false);
  const makeInputEmpty = () => setInput("");
  const submitFunction = () => {
    const data = {
      id: uuid(),
      text: input,
      senderUid: currentUser[UID__KEY__],
      date: Timestamp.now()
    };
    if (input) {
      dispatch(clickSendMessage(data, combinedUid_, makeInputEmpty));
    }
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
  const handleInputImage = async (e) => {
    const img = e.target.files[0];
    if (img) {
      setImageInput(img);
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          // TODO handle error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const data = {
              id: uuid(),
              img: downloadURL,
              senderUid: currentUser[UID__KEY__],
              date: Timestamp.now()
            };
            await updateDoc(doc(db, CONVERSATION__TABLE__KEY__, combinedUid_), {
              messages: arrayUnion({ ...data })
            });
          })
        }
      )
    }
  }
  // console.log("imageInput", imageInput);
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
          <label htmlFor="imageInput">
            <FontAwesomeIcon icon={faImage} />
          </label>
          <input type="file" onChange={handleInputImage} id="imageInput" accept="image/*" style={{ display: 'none' }} />
        </div>
        {/* <div className="ChatFooter__actionSend" onClick={clickSubmitButton}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div> */}
      </div>
    </div>
  )
}

export default ChatFooter
