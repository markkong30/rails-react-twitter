import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Layouts/layout";
import { handleErrors } from "./utils/fetchHelper";
import '../src/search.scss'

class Search extends React.Component {
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
          console.log(response)
        this.setState({ accountUsername: response.username, username: response.username });        
      }
    })

  }

  render() {
    const { username, accountUsername } = this.state;
    return (
      <Layout username={username} accountUsername={accountUsername} />
    );

  }
};

export default Search;
