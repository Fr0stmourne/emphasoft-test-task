import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { proxy, clientID, clientSecret, redirectCallbackUrl } from '../../constants';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CallbackPage() {
  const [redirect, setRedirect] = useState(false);
  const query = useQuery();
  const code = query.get('code');

  useEffect(() => {
    async function getToken() {
      const result = await fetch(`${proxy}https://oauth.vk.com/access_token?client_id=${clientID}&client_secret=${clientSecret}&redirect_uri=${redirectCallbackUrl}&code=${code}`)
      const json = await result.json();
      const token = json['access_token'];
      try {
        localStorage.setItem('token', token);
        setRedirect(true)
      } catch (error) {
        console.log(error);
      }
      return token
    }

    getToken();
  }, [code])

    return (
      <div>
        {redirect ? window.history.back() : null }
        <h1>Страница переадресации</h1>
        <p>Ожидайте, пока произойдет перенаправление на предыдущую страницу. Если этого не происходит, перейдите по ссылке ниже.</p>
        <Link to="/">Вернуться на главную</Link>
      </div>
    );
}
