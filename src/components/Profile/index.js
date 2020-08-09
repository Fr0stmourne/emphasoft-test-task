import React from 'react';
import LocalStorageProvider from '../../utils/localStorageProvider';
import PropTypes from 'prop-types';
import './index.scss';
import { fakePhoto } from '../../utils/fakeData';

const defaultResource = {
  read() {
    return {
      first_name: 'Имя',
      last_name: 'Фамилия',
      photo_400_orig: fakePhoto,
      id: 0,
    };
  },
};

const logoutUser = () => {
  LocalStorageProvider.removeToken();
  document.location.reload();
};

export default function Profile({
  buttonText = 'Выйти',
  profile: profileResource = defaultResource,
}) {
  const {
    first_name: firstName,
    last_name: lastName,
    photo_400_orig: photoLink,
    id,
  } = profileResource.read();
  return (
    <div className="profile">
      <img
        className="profile__photo"
        src={photoLink}
        alt={`Аватар пользователя ${firstName} ${lastName}`}
      ></img>
      <a
        className="profile__name"
        href={`https://vk.com/id${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >{`${firstName} ${lastName}`}</a>
      <button className="profile__logout" onClick={logoutUser}>
        {buttonText}
      </button>
    </div>
  );
}

Profile.propTypes = {
  buttonText: PropTypes.string,
  profileResource: PropTypes.object,
};
