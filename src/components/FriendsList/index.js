import React from 'react';
import Friend from '../Friend';
import PropTypes from 'prop-types';
import './index.scss';
import { fakeFriends } from '../../utils/fakeData';

const defaultResource = {
  read() {
    return fakeFriends;
  },
};

export default function FriendsList({
  title = 'Мои друзья:',
  friends: friendsResource = defaultResource,
}) {
  const friends = friendsResource.read();
  return (
    <section className="friends">
      <h2 className="friends__title">{title}</h2>
      <ul className="friends__list">
        {friends.map((friend, index) => {
          const {
            first_name: firstName,
            last_name: lastName,
            photo_100: photoLink,
            online,
            id,
          } = friend;

          return (
            <li key={id || index} className="friends__item">
              <Friend
                firstName={firstName}
                lastName={lastName}
                photoLink={photoLink}
                online={Boolean(online)}
                id={id}
              ></Friend>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

FriendsList.propTypes = {
  friends: PropTypes.object,
  title: PropTypes.string,
};
