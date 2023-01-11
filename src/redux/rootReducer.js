import { combineReducers } from 'redux';
import { reducer as singInReducer } from './SignIn/reducer';
import { reducer as homeReducer } from './Home/reducer';
import { SIGNIN_REDUCER_KEY } from './SignIn/const';
import { HOME_REDUCER_KEY } from './Home/const';

export default combineReducers({
  [SIGNIN_REDUCER_KEY]: singInReducer,
  [HOME_REDUCER_KEY]: homeReducer
});