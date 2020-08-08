/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense } from 'react';
import { useResource } from '../../resource';
import Preloader from '../Preloader';
import Profile from '../Profile';
import FriendsList from '../FriendsList';
import Login from '../Login';

import './index.scss';
import LocalStorageProvider from '../../localStorageProvider';

export default function MainPage() {
  const token = LocalStorageProvider.getToken();
  console.log('TOKEN', token);
  let resource;
  if (token) {
    resource = useResource(token);
  }

  return (
    <div className="main-page">
      {token ? (
        <>
          <section className="main-page__profile">
            <Suspense fallback={<Preloader></Preloader>}>
              <Profile profile={resource.profile}></Profile>
            </Suspense>
          </section>
          
          <Suspense fallback={<Preloader></Preloader>}>
            <FriendsList friends={resource.friends}></FriendsList>
          </Suspense>
        </>
      ) : <Login/>}
    </div>
  )
}