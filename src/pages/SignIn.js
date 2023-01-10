import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { firebase } from '../firebase/firebase';

const SignIn = () => {
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
