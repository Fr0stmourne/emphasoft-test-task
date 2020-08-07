import React, { useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import fakeFriendsArr from './fake_friends'
import Friend from "./components/Friend";

const clientID = 7560327;
const clientSecret = '8BapO0AwbPmQFfeTawZS';
const redirectCallbackUrl = 'http://localhost:3000/auth/vkontakte/callback';

export default function App() {
  return (
    <Router>
      <div>
        
        {/* <ul>
          <li>
            <Link to="/auth/vkontakte/callback">Callback</Link>
          </li>
        </ul> */}

        <Switch>
          <Route exact path="/" children={<MainPage />} />
          <Route path="/auth/vkontakte/callback" children={<CallbackPage />} />
        </Switch>
      </div>
    </Router>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const proxy = `https://cors-anywhere.herokuapp.com/`;

function MainPage() {
  const token = localStorage.getItem('token');

  const [friends, setFriends] = useState([]);

  async function getFriends(token) {
    // const friendApi = `${proxy}https://api.vk.com/method/friends.get?count=5&fields=photo_100&v=5.122&&access_token=${token}`;
    // const friendsResp = await fetch(friendApi);
    // console.log(friendsResp);
    
    // console.log(await friendsResp.text());
    // const data = await friendsResp.json();
    // const friendArr = data.response.items;
    const friendArr = await Promise.resolve(fakeFriendsArr);
    console.log(friendArr);
    setFriends(friendArr)
  }

  useEffect(() => {
    if (token && friends.length === 0) {
      console.log('есть токен, гружу друзей');
      getFriends(token);
    }
  })

  return (
    <React.Fragment>
      {!token && (
        <React.Fragment>
          <h2>Авторизация</h2>
          <a style={{display: 'block'}} href={`https://oauth.vk.com/authorize?client_id=${clientID}&display=page&redirect_uri=${redirectCallbackUrl}&scope=friends,offline&response_type=code&v=5.122`}>Авторизоваться</a>
        </React.Fragment>
      )}
      {friends.length && (
        <React.Fragment>
          <ul className="friends">
            Список друзей:
            {
              friends.map((friend, index) => {
                const {
                  'first_name': firstName,
                  'last_name': lastName,
                  'photo_100': photoLink
                } = friend;

                const FAKE_PHOTO = 'https://sun9-49.userapi.com/c855536/v855536573/24b6e1/Vx9ANB_8sos.jpg';
                return (
                  <li key={index} className="friends__item">
                    <Friend firstName={firstName} lastName={lastName} photoLink={FAKE_PHOTO}></Friend>
                  </li>
                )
              })
            }
          </ul>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

function CallbackPage() {

  const [redirect, setRedirect] = useState(false);
  const query = useQuery();
  const code = query.get('code');
  // console.log(code);

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
        <h2>Вернуться?</h2>
        <Link to="/">Main</Link>
      </div>
    );
}
