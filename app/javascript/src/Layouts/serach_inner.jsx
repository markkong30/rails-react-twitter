import React from "react";
import ReactDOM from "react-dom";
import { safeCredentials, handleErrors } from '../utils/fetchHelper';

class SearchInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            tweetsCountBySearch: 0,
            search: [],
        }
        this.updateTweetsWithSearch = this.updateTweetsWithSearch.bind(this);
        this.deleteTweet = this.deleteTweet.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    componentDidMount() {
        this.updateTweetsWithSearch();
        // setTimeout(() => {
        // this.updateTweetsWithSearch();
        // }, 100)
    }

    updateTweetsWithSearch() {
        const search = decodeURI(window.location.pathname.split('=')[1]).split(' ');
        console.log(search)

        fetch(`/api/tweets`)
            .then(handleErrors)
            .then(response => {
                const tweets = response.tweets.filter(tweet => {
                    for (const ele of search) {
                        if (tweet.message.indexOf(ele) == -1 && tweet.username.indexOf(ele) == -1) {
                            return false;
                        }
                    }
                    return true;
                });
                console.log(tweets)
                const tweetsCountBySearch = tweets.length
                this.setState({ tweets, search, tweetsCountBySearch });
            })
            .then(() => {
                this.props.updateCount();
            })
    }

    deleteTweet(event) {
        event.preventDefault();
        const tweet = event.target.parentNode.parentNode.parentNode;
        const id = tweet.getAttribute('data-key');

        fetch(`/api/tweets/${id}`, safeCredentials({
            method: 'DELETE',
        }))
            .then(handleErrors)
            .then(response => {
                console.log(response);
            })
            .then(() => {
                this.updateTweetsWithSearch();
            })
        // setTimeout(() => {
        // this.updateTweetsWithSearch();
        // }, 100);
    }

    getUserProfile(event) {
        const username = event.target.innerText;
        window.location.replace(`/tweets/${username}`);
    }


    render() {
        const { tweets, tweetsCountBySearch, search } = this.state;
        const { username, accountUsername } = this.props;
        const searchDisplay = search.join(' ')

        return (
            <React.Fragment>
                <div className="col-12 col-md-6 offset-md-1 py-3">
                    <div className="row">

                        <div className="col-12 my-5">
                            <h3 className="result text-center my-3 p-2" id="result">About <span className="text-danger fw-bold">&ensp;{tweetsCountBySearch}&ensp;</span> result&#40;s&#41; found for <span className="text-muted fst-italic">"{searchDisplay}"</span>
                            </h3>

                            {tweets.map(tweet => {
                                return (
                                    <div className="tweet my-2 p-2 position-relative" key={tweet.id} data-key={tweet.id}>
                                        <div className="pb-2 user fw-bold fs-6">
                                            <a href="#" onClick={this.getUserProfile}><span>{tweet.username}</span></a>
                                            <span className="subuser text-muted ps-1">@{tweet.username}</span>
                                        </div>
                                        <div className="message">{tweet.message}</div>
                                        {tweet.image && <img src={tweet.image} className="mt-2 mx-auto d-flex" style={{maxHeight: 200}} alt="Image" />}

                                        {accountUsername == tweet.username && (
                                            <div className="position-absolute tweet-delete">
                                                <a href='#' className="btn-delete"
                                                    onClick={this.deleteTweet}>
                                                    <i className="fas fa-backspace"></i>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </React.Fragment>

        )
    }
}

export default SearchInner;