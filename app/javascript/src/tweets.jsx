import React from "react";
import ReactDOM from "react-dom";
import Layout from './Layouts/layout';
import Feeds from "./Layouts/feeds";
import { handleErrors } from "./utils/fetchHelper";
import './tweets.scss';

class Tweets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'unauthorized user',
      accountUsername: '',
    }
  }
  componentDidMount() {
    fetch(`/api/authenticated`)
      .then(handleErrors)
      .then(response => {
        if (response.authenticated) {
          this.setState({
            username: response.username,
            accountUsername: response.username,
          });
        }
      });

  }

  render() {
    const { username, accountUsername } = this.state;
    return (
      <Layout username={username} accountUsername={accountUsername} />

    );

  }
};

export default Tweets;
