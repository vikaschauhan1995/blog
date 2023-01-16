import React from 'react';
import '../styles/components/ConversationHeader.scss';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../redux/Home/action';
import { SIGNIN_REDUCER_KEY, IS_USER_LOGGEDIN, PHOTO_URL__KEY__, DISPLAY_NAME__KEY__ } from '../redux/SignIn/const';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const ConversationHeader = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state[SIGNIN_REDUCER_KEY]);
  // console.log("state", state[IS_USER_LOGGEDIN][PHOTO_URL__KEY__]);
  const signOutClick = () => {
    dispatch(logoutAction());
  }
  return (
    <div className="ConversationHeader__container">
      <div className='ConversationHeader__containerLeft'>
        <img src={state[IS_USER_LOGGEDIN][PHOTO_URL__KEY__]} alt="" referrerPolicy="no-referrer" />
      </div>
      <div className="ConversationHeader__containerMid">
        <b>{state[IS_USER_LOGGEDIN][DISPLAY_NAME__KEY__]}</b>
      </div>
      <div className="ConversationHeader__containerRight">
        <FontAwesomeIcon onClick={signOutClick} icon={faRightFromBracket} />
      </div>
    </div>
  )
}

export default ConversationHeader
