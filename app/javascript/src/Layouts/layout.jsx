import React from "react";
import { Link } from "react-router-dom";
import Feeds from "./feeds";
import FeedUser from "./feed_user";
import SearchInner from "./serach_inner";
import trend_pic from '../../../assets/images/trend.jpg'
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userTweetCount: 0,
    }
    this.updateCount = this.updateCount.bind(this);
    this.searchContent = this.searchContent.bind(this);
  }
  
  updateCount() {
    setTimeout(()=> {
      fetch(`/api/users/${this.props.username}/tweets`)
      .then(handleErrors)
      .then(response => {
        const userTweetCount = response.tweets.length;
        this.setState({ userTweetCount });
      })  
    })
  }

  logOutHandler = (event) => {
    fetch(`/api/sessions`, safeCredentials({
      method: 'DELETE',
    }))
      .then(handleErrors)
      .then(response => {
        if (response.success) {
          window.location.replace('/');
        }
      })
  }

  searchContent(event) {
    event.preventDefault();
    const search = event.target.search.value;
    window.location.replace(`/tweets/search=${search}`);

  }

  render() {
    const { accountUsername, username, children } = this.props;
    const { userTweetCount } = this.state;

    return (
      <div id="tweets">
        <div id="tweets_background"></div>
        <nav className="navbar navbar-expand-md navbar-light bg-light navbar-fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/tweets">
              <span className='nav-logo'>
                <i className="fab fa-twitter"></i>
              </span>
            </Link>

            <form className="d-flex ms-auto px-5" onSubmit={this.searchContent}>
              <input className="form-control me-2" type="search" name="search" placeholder="Search for keywords" />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {accountUsername}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href={`/tweets/${accountUsername}`}>
                      <span id="user-dropdown">{accountUsername}</span>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">Lists</a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">Help</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#"> Settings</a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href='#' onClick={this.logOutHandler}>Log Out</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        <div className="main">
          <div className="container">
            <div className="row justify-content-center justify-content-md-start">
              <div className="col-10 col-md-4 col-lg-3">
                <div className="card py-3 my-3">
                  <div className="card-body">
                    <a href={`/tweets/${username}`}><h5 className="card-title">{username}</h5></a>
                    <h6 className="card-subtitle mb-2 text-muted">@{username}</h6>
                    <div className="row">
                      <div className="col-3">
                        <a href="/tweets" className="card-link text-decoration-none">
                          <span className="card-text text-muted">TWEETS</span><br />
                          <span className="card-number">{userTweetCount}</span>
                        </a>
                      </div>
                      <div className="col-4">
                        <a href="/tweets" className="card-link text-decoration-none">
                          <span className="card-text text-muted">FOLLOWINGS</span><br />
                          <span className="card-number">0</span>
                        </a>
                      </div>

                      <div className="col-4">
                        <a href="/tweets" className="card-link text-decoration-none">
                          <span className="card-text text-muted">FOLLOWERS</span><br />
                          <span className="card-number">0</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="card trend col-12 d-none d-md-block py-4">
                    <h5 className="mb-2">Latest Trend for you!</h5>
                    <a href=""><img src={trend_pic} alt="Photo of Latest Trend" className="card-img img-fluid" /></a>
                    <div className="card-body">
                      <p className="card-title">Francesco Ungaro</p>
                      <p className="card-subtitle">7.85K followers</p>
                      <p className="card-text mt-3">Hot ballons in the sky!</p>
                    </div>
                  </div>
                </div>
                
              </div>
              {window.location.pathname == "/tweets" && <Feeds username={username} updateCount={this.updateCount}/>}
              {window.location.pathname.match(/^\/tweets\/(?!.*search).*/) && <FeedUser username={username} accountUsername={accountUsername} updateCount={this.updateCount}/>}
              {window.location.pathname.match(/\/tweets\/search.*/) && <SearchInner username={username} accountUsername={accountUsername} updateCount={this.updateCount} />}

            </div>
          </div>
        </div>
      </div>

    );
  }

};

export default Layout;
