/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense } from 'react';
import { useResource } from '../../utils/resource';
import Preloader from '../Preloader';
import Profile from '../Profile';
import FriendsList from '../FriendsList';
import Login from '../Login';

import './index.scss';
import LocalStorageProvider from '../../utils/localStorageProvider';

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
        <Suspense fallback={<Preloader></Preloader>}>
          <section className="main-page__profile">
            <Profile profile={resource.profile} />
          </section>
          <FriendsList friends={resource.friends} />
        </Suspense>
      ) : (
        <Login />
      )}
    </div>
  );
}
