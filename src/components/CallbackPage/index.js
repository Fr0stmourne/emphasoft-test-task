import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchToken } from '../../utils/apiRequests';
import LocalStorageProvider from '../../utils/localStorageProvider';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CallbackPage({
  title = 'Страница переадресации',
  description = `Ожидайте, пока произойдет перенаправление на предыдущую страницу. Если
  этого не происходит, перейдите по ссылке ниже и попробуйте
  авторизоваться еще раз.`,
  linkText = 'Вернуться на главную',
}) {
  const [redirect, setRedirect] = useState(false);
  const query = useQuery();
  const code = query.get('code');

  useEffect(() => {
    async function getToken(code) {
      const token = await fetchToken(code);
      try {
        LocalStorageProvider.setToken(token);
        setRedirect(true);
      } catch (error) {
        console.log(error);
      }
    }

    getToken(code);
  }, [code]);

  return (
    <div>
      {redirect ? window.history.back() : null}
      <h1>{title}</h1>
      <p>{description}</p>
      <Link to="/">{linkText}</Link>
    </div>
  );
}

CallbackPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  linkText: PropTypes.string,
};
