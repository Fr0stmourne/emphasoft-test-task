import React from 'react';
import { clientID, redirectCallbackUrl } from '../../utils/constants';
import PropTypes from 'prop-types';
import './index.scss';

export default function Login({
  title = 'Авторизация',
  buttonText = 'Авторизоваться Вконтакте',
}) {
  return (
    <div className="login">
      <h1 className="login__title">{title}</h1>
      <a
        className="login__button"
        href={`https://oauth.vk.com/authorize?client_id=${clientID}&display=page&redirect_uri=${redirectCallbackUrl}&scope=friends,offline&response_type=code&v=5.122`}
      >
        <span className="visually-hidden">{buttonText}</span>
      </a>
    </div>
  );
}

Login.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string,
};
