import React from "react";

export default function Friend({firstName, lastName, photoLink}) {
  return (
    <div className="friend">
      <div className="friend__first-name">{firstName}</div>
      <div className="friend__last-name">{lastName}</div>
      <img className="friend__photo" src={photoLink} alt={`${firstName} ${lastName}`}></img>
    </div>
  )
}