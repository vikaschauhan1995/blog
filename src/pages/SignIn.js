import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInAction } from '../redux/SignIn/action';
import '../styles/pages/SignIn.scss';
import { FACEBOOK_SIGNIN, GOOGLE_SIGNIN } from '../redux/SignIn/const';

const SignIn = () => {
  // const state = useSelector(state => state);
  const dispatch = useDispatch();
  const googleSignInClick = () => {
    dispatch(signInAction(GOOGLE_SIGNIN));
  }
  const facebookSignInClick = () => {
    dispatch(signInAction(FACEBOOK_SIGNIN));
  }
  return (
    <div className="SignIn__container">
      <div className="SignIn__inner_container" onClick={googleSignInClick}>
        <div className='SignIn__googleIconContainer'>
          <img src="https://www.google.com/favicon.ico" alt="google icon" />
        </div>
        <div className='SignIn__googleButtonText'>
          <div>
            Sign in with Google
          </div>
        </div>
      </div>
      <button onClick={facebookSignInClick}>Facebook login</button>
    </div>
  )
}

export default SignIn
