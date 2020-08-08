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
import Preloader from "./components/Preloader";
import { useResource } from "./resource";
import { proxy } from "./constants";
import Profile from "./components/Profile";
import './App.scss';
import './components/Login/index.scss'

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
    <div className="app">
      {!token && (
        <div className="login">
          <h1 className="login__title">Авторизация</h1>
          <a className="login__button" style={{display: 'block'}} href={`https://oauth.vk.com/authorize?client_id=${clientID}&display=page&redirect_uri=${redirectCallbackUrl}&scope=friends,offline&response_type=code&v=5.122`}><span className="visually-hidden">Авторизоваться</span></a>
        </div>
      )}
      {token && (
        <div className="main-page">
          <section className="main-page__profile">
            <Suspense fallback={<Preloader></Preloader>}>
              <Profile profile={resource.profile}></Profile>
            </Suspense>
          </section>
          
          <Suspense fallback={<Preloader></Preloader>}>
            <FriendsList friends={resource.friends}></FriendsList>
          </Suspense>
        </div>
      )}
    </div>
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
