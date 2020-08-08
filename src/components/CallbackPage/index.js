import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchToken } from '../../utils/apiRequests';
import LocalStorageProvider from '../../utils/localStorageProvider';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CallbackPage() {
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
      <h1>Страница переадресации</h1>
      <p>
        Ожидайте, пока произойдет перенаправление на предыдущую страницу. Если
        этого не происходит, перейдите по ссылке ниже и попробуйте
        авторизоваться еще раз.
      </p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}
