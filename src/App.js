import React, { useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  Redirect
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

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

function MainPage() {
  return (
    <React.Fragment>
      <h2>Авторизация</h2>
      <a style={{display: 'block'}} href={`https://oauth.vk.com/authorize?client_id=${clientID}&display=page&redirect_uri=${redirectCallbackUrl}&scope=friends,offline&response_type=code&v=5.122`}>Авторизоваться</a>
    </React.Fragment>
  )
}

function CallbackPage() {

  const [redirect, setRedirect] = useState(false);
  const query = useQuery();
  const code = query.get('code');
  // console.log(code);

  const proxy = `https://cors-anywhere.herokuapp.com/`;
  useEffect(() => {
    // async function getFriends() {
    //   const token = await getToken();
    //   const friendApi = `${proxy}https://api.vk.com/method/friends.get?count=5&fields=photo_100&v=5.122&&access_token=${token}`;
    //   const friendsResp = await fetch(friendApi);
    //   const data = await friendsResp.json();
    //   console.log(data);
    // }

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
  }, [])

  // if (redirect) {
  //   return (
  //     <Redirect to="/somewhere" />
  //   )
  // } else {
    return (
      <div>
        {redirect ? window.history.back() : null }
        <h2>Вернуться?</h2>
        <Link to="/">Main</Link>
      </div>
    );
}
