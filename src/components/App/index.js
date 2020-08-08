/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';
import './components/Login/index.scss';
import CallbackPage from '../CallbackPage';
import MainPage from '../MainPage';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" children={<MainPage />} />
          <Route path="/auth/vkontakte/callback" children={<CallbackPage />} />
        </Switch>
      </div>
    </Router>
  );
}
