import React from 'react';
import Friend from '../Friend';
import './index.scss';

export default function FriendsList({ friends: friendsResource }) {
  const friends = friendsResource.read();
  return (
    <section className="friends">
      <h2 className="friends__title">Мои друзья:</h2>
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
            <li key={index} className="friends__item">
              <Friend
                firstName={firstName}
                lastName={lastName}
                photoLink={photoLink}
                online={online}
                id={id}
              ></Friend>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
