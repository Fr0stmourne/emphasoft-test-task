import React from 'react';
import { clientID, redirectCallbackUrl } from '../../utils/constants';

export default function Login() {
  return (
    <div className="login">
      <h1 className="login__title">Авторизация</h1>
      <a
        className="login__button"
        href={`https://oauth.vk.com/authorize?client_id=${clientID}&display=page&redirect_uri=${redirectCallbackUrl}&scope=friends,offline&response_type=code&v=5.122`}
      >
        <span className="visually-hidden">Авторизоваться Вконтакте</span>
      </a>
    </div>
  );
}
