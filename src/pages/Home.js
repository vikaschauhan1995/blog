import React, { useEffect, useState } from 'react'
// import { getAuth, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db, realTimeDatabase } from '../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { HOME_REDUCER_KEY } from '../redux/Home/const';
import { SIGNIN_REDUCER_KEY, IS_USER_LOGGEDIN } from '../redux/SignIn/const';
import { logoutAction, sendMessageAction } from '../redux/Home/action';
import { set, ref } from 'firebase/database';
import { uid } from 'uid';
import { _ID__KEY__, MESSAGE_FROM__KEY__, MESSAGE_TO__KEY__, MESSAGE__KEY__ } from '../redux/Home/const';

const Home = () => {
  // const messagesCollectionRef = query(collection(db, "message"), where("email", "==", "coolestvikas1995@gmail.com"));
  const dispatch = useDispatch();
  // const state = useSelector(state => state);
  const signInReducerState = useSelector(state => state[SIGNIN_REDUCER_KEY])
  console.log("signInReducerState ", signInReducerState);
  const [textInput, setTextInput] = useState("");
  const handleTextInputChange = (event) => {
    const input = event.target.value;
    setTextInput(input);
  }
  const signOutClick = () => {
    dispatch(logoutAction());
  }
  const clickSubmitButton = () => {
    const uniqueId = uid();
    const data = {
      [_ID__KEY__]: uniqueId,
      [MESSAGE_FROM__KEY__]: signInReducerState[IS_USER_LOGGEDIN].email,
      [MESSAGE_TO__KEY__]: 'vikas.chauhan.bb@gmail.com',
      [MESSAGE__KEY__]: textInput
    };
    dispatch(sendMessageAction(data));
    // set(ref(realTimeDatabase, `/${uniqueId}/`), data);
    setTextInput("");
  }

  return (
    <div>
      Home
      <div>
        <button onClick={signOutClick}>Sign out</button>
      </div>
      <div>
        <input type="text" value={textInput} onChange={handleTextInputChange} />
        <button onClick={clickSubmitButton}>Submit</button>
      </div>
    </div>
  )
}

export default Home
