import React from 'react';
import '../styles/components/SearchConversationUserList.scss';
import { useSelector } from 'react-redux';
import { CONVERSATION_REDUCER_KEY, SERCHED_USER_LIST__KEY__ } from '../redux/Conversation/const';
import { DISPLAY_NAME__KEY__, IS_USER_LOGGEDIN, PHOTO_URL__KEY__, SIGNIN_REDUCER_KEY, UID__KEY__ } from '../redux/SignIn/const';
import { clickSearchedUserAction, makeDisableSearchedUserListAction } from '../redux/Conversation/action';
import { useDispatch } from 'react-redux';
import { CURRENT_USER, SELECTED_USER } from '../redux/Conversation/const';

const SearchConversationUserList = ({ setSearchInput }) => {
  const state = useSelector(state => state);
  const usersList = state[CONVERSATION_REDUCER_KEY][SERCHED_USER_LIST__KEY__];
  const dispatch = useDispatch();
  const ItemList = ({ users }) => {
    const handleClick = (selectedUser) => {
      const currentUser = state[SIGNIN_REDUCER_KEY][IS_USER_LOGGEDIN];
      const data = {
        [CURRENT_USER]: currentUser,
        [SELECTED_USER]: selectedUser
      };
      dispatch(clickSearchedUserAction(data));
      dispatch(makeDisableSearchedUserListAction());
      setSearchInput("");
    }
    const list = users.map(user => {
      return (
        <div className="SearchConversationUserList__userList_item" onClick={() => handleClick(user)} key={user[UID__KEY__]}>
          <div className="SearchConversationUserList__userList_itemInner">
            <div className='SearchConversationUserList__userList_item_left'>
              <img src={user[PHOTO_URL__KEY__]} alt="" referrerPolicy="no-referrer" />
            </div>
            <div className="SearchConversationUserList__userList_item_right">
              <div>{user[DISPLAY_NAME__KEY__]}</div>
            </div>
          </div>
        </div>
      );
    });
    return (<>
      {list}
    </>
    );
  }
  if (usersList.length > 0) {
    return <ItemList users={usersList} />;
  }
  return (
    <div>
      No users found
    </div>
  )
}

export default SearchConversationUserList
