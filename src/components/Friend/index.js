import React from 'react';
import StatusIcon from '../StatusIcon';
import PropTypes from 'prop-types';
import { fakePhoto } from '../../utils/fakeData';
import './index.scss';

export default function Friend({
  firstName = 'Имя',
  lastName = 'Фамилия',
  photoLink = fakePhoto,
  online = false,
  id = 0,
}) {
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

Friend.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  photoLink: PropTypes.string,
  online: PropTypes.bool,
  id: PropTypes.number,
};
