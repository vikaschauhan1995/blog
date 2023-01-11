import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { firebase } from '../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';

const SignIn = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const signInClick = () => {
    let google_provider = new GoogleAuthProvider();
    let auth = getAuth(firebase);
    signInWithPopup(auth, google_provider).then((res) => {
      console.log('google signIn response', res);
    }).catch((err) => {
      console.log('google signIn error', err);
    });
  }
  return (
    <div>
      Sign In page
      <button onClick={signInClick}>Sign In</button>
    </div>
  )
}

export default SignIn
