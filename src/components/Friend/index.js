import React from 'react';
import './index.scss';
import StatusIcon from '../StatusIcon';

export default function Friend({ firstName, lastName, photoLink, online, id }) {
  return (
    <div className="friend">
      <img
        className="friend__photo"
        src={photoLink}
        alt={`Аватар пользователя ${firstName} ${lastName}`}
      ></img>
      <div className="friend__info">
        <a
          className="friend__name"
          href={`https://vk.com/id${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >{`${firstName} ${lastName}`}</a>
        <div className="friend__status">
          <StatusIcon online={online}></StatusIcon>
        </div>
      </div>
    </div>
  );
}
