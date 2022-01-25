import React from "react";
import ReactDOM from "react-dom";
import FeedUser from "./Layouts/feed_user";
import Layout from "./Layouts/layout";
import { handleErrors } from "./utils/fetchHelper";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountUsername: 'unauthorized user',
      username: '',
    }
  }
  componentDidMount() {
    fetch(`/api/authenticated`)
    .then(handleErrors)
    .then(response => {
      if (response.authenticated) {
        this.setState({ accountUsername: response.username });        
      }
    })

    const username = window.location.pathname.split('/')[2];
    this.setState({ username });

  }

  render() {
    const { username, accountUsername } = this.state;
    return (
      <Layout username={username} accountUsername={accountUsername} />
    );

  }
};

export default User;
