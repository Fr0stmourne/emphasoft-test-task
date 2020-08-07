import React from 'react';

export default function Profile({profile: profileResource}) {
  const {'first_name': firstName, 'last_name': lastName, 'photo_100': photoLink, id} = profileResource.read();
  // const profile = 
  // console.log(profile);
  return (
    <div className="profile">
      <img className="profile__photo" src={photoLink} alt={`Аватар пользователя ${firstName} ${lastName}`}></img>
      <div className="profile__info">
        <a className="profile__name" href={`https://vk.com/id${id}`} target="_blank" rel="noopener noreferrer">{`${firstName} ${lastName}`}</a>
      </div>
    </div>
  )
}