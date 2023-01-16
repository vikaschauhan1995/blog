import React from 'react';
import '../styles/components/SearchConversationUserList.scss';
import { useSelector } from 'react-redux';
import { CONVERSATION_REDUCER_KEY, SERCHED_USER_LIST__KEY__ } from '../redux/Conversation/const';
import { DISPLAY_NAME__KEY__, PHOTO_URL__KEY__ } from '../redux/SignIn/const';


const UsersList = ({ users }) => {
  const list = users.map(user => {
    return (
      <div className="SearchConversationUserList__userList_item">
        <div className='SearchConversationUserList__userList_item_left'>
          <img src={user[PHOTO_URL__KEY__]} alt="" />
        </div>
        <div className="SearchConversationUserList__userList_item_right">
          <div>{user[DISPLAY_NAME__KEY__]}</div>
        </div>
      </div>
    );
  });
  return (<>
    {list}
  </>
  );
}
const SearchConversationUserList = () => {
  const state = useSelector(state => state);
  const usersList = state[CONVERSATION_REDUCER_KEY][SERCHED_USER_LIST__KEY__]
  if (usersList.length > 0) {
    return <UsersList users={usersList} />;
  }
  return (
    <div>
      No users found
    </div>
  )
}

export default SearchConversationUserList
