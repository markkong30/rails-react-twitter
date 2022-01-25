import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './home';
import Tweets from './tweets';
import User from './user';
import Search from './search';
import './index.scss';

const Index = () => {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tweets" exact component={Tweets} />
          <Route path="/tweets/search=:search" component={Search} />
          <Route path="/tweets/:user" component={User} />
          <Route render={() => <h1>404 Not found</h1>} />
        </Switch>
    </Router>
  );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
      <Index />,
      document.body.appendChild(document.createElement("div"))
    );
  });
  