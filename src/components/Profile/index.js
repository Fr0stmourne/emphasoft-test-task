import React from 'react';

export default function Profile({firstName, lastName, photoLink, id}) {
  return (
    <div className="profile">
      <img className="profile__photo" src={photoLink} alt={`Аватар пользователя ${firstName} ${lastName}`}></img>
      <div className="profile__info">
        <a className="profile__name" href={`https://vk.com/id${id}`} target="_blank" rel="noopener noreferrer">{`${firstName} ${lastName}`}</a>
      </div>
    </div>
  )
}