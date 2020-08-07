import React from "react";

import './index.scss'; 
import onlineImg from './img/online.png'
import offlineImg from './img/offline.png'

export default function Friend({firstName, lastName, photoLink, online, id}) {
  return (
    <div className="friend">
      <img className="friend__photo" src={photoLink} alt={`Аватар пользователя ${firstName} ${lastName}`}></img>
      <div className="friend__info">
        <a className="friend__name" href={`https://vk.com/id${id}`} target="_blank" rel="noopener noreferrer">{`${firstName} ${lastName}`}</a>
        <img className="friend__online" src={online ? onlineImg : offlineImg} alt="Пользователь онлайн"></img>
      </div>
    </div>
  )
}