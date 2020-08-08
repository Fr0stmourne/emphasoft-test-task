import React from 'react';
import './index.scss';
import LocalStorageProvider from '../../localStorageProvider';

export default function Profile({profile: profileResource}) {
  const {'first_name': firstName, 'last_name': lastName, 'photo_400_orig': photoLink, id} = profileResource.read();
  return (
    <div className="profile">
      <img className="profile__photo" src={photoLink} alt={`Аватар пользователя ${firstName} ${lastName}`}></img>
      <a className="profile__name" href={`https://vk.com/id${id}`} target="_blank" rel="noopener noreferrer">{`${firstName} ${lastName}`}</a>
      <button className="profile__logout" onClick={() => {
        LocalStorageProvider.removeToken();
        document.location.reload();
      }}>Выйти</button>
    </div>
  )
}