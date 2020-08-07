/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, Suspense} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import FriendsList from "./components/FriendsList";
import './mainPage.scss'
import Preloader from "./components/Preloader";
import { useResource } from "./resource";
import { proxy } from "./constants";

const clientID = 7560327;
const clientSecret = '8BapO0AwbPmQFfeTawZS';
const redirectCallbackUrl = 'http://localhost:3000/auth/vkontakte/callback';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<MainPage />} />
        <Route path="/auth/vkontakte/callback" children={<CallbackPage />} />
      </Switch>
    </Router>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function MainPage() {
  const token = localStorage.getItem('token');

  let resource;
  if (token) {
    resource = useResource(token);
  }

  return (
    <React.Fragment>
      {!token && (
        <React.Fragment>
          <h2>Авторизация</h2>
          <a style={{display: 'block'}} href={`https://oauth.vk.com/authorize?client_id=${clientID}&display=page&redirect_uri=${redirectCallbackUrl}&scope=friends,offline&response_type=code&v=5.122`}>Авторизоваться</a>
        </React.Fragment>
      )}
      {token && (
        <section className="friends">
          <h1 className="friends__title">Мои друзья:</h1>
          <Suspense fallback={<Preloader></Preloader>}>
            <FriendsList friends={resource.friends}></FriendsList>
          </Suspense>
        </section>
      )}
    </React.Fragment>
  )
}

function CallbackPage() {

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

    // getFriends();
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
