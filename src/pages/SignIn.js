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
      <div className="GoogleSignIn__inner_container" onClick={googleSignInClick}>
        <div className='SignIn__googleIconContainer'>
          <img src="https://www.google.com/favicon.ico" alt="google icon" />
        </div>
        <div className='SignIn__googleButtonText'>
          <div>
            Sign in with Google
          </div>
        </div>
      </div>
      <div className="FacebookSigin__inner_container" onClick={facebookSignInClick}>
        <div className='SignIn__facebookIconContainer'>
          <i className="gg-facebook"></i>
        </div>
        <div className='SignIn__googleButtonText'>
          <div>
            Sign in with Facebook
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
