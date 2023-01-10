import React from 'react'
import { getAuth, signOut } from 'firebase/auth';
import { firebase } from '../firebase/firebase';

const Home = () => {
  const signOutClick = () => {
    const auth = getAuth(firebase);
    signOut(auth).then((res) => {
      console.log("signout response", res);
    }).catch(err => {
      console.log("signout error", err);
    });
  }
  return (
    <div>
      Home
      <div>
        <button onClick={signOutClick}>Sign out</button>
      </div>
    </div>
  )
}

export default Home
