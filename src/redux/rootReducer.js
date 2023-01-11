import { combineReducers } from 'redux';
import { reducer as singInReducer } from './SignIn/reducer';
import { SIGNIN_REDUCER_KEY } from './SignIn/const';

export default combineReducers({
  [SIGNIN_REDUCER_KEY]: singInReducer
});