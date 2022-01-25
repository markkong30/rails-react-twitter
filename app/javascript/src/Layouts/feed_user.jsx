import React from "react";
import ReactDOM from "react-dom";
import { safeCredentials, handleErrors, safeCredentialsFormData } from '../utils/fetchHelper';

class FeedUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
        }
        this.tweetCreate = this.tweetCreate.bind(this);
        this.updateTweets = this.updateTweets.bind(this);
        this.deleteTweet = this.deleteTweet.bind(this);
        this.tweetCreateToggle = this.tweetCreateToggle.bind(this);
        this.imagePreview = this.imagePreview.bind(this);
    }

    componentDidMount() {
        this.updateTweets();
    }

    updateTweets() {
        fetch(`/api/tweets`)
            .then(handleErrors)
            .then(response => {
                const tweets = response.tweets.filter(tweet => {
                    return tweet.username == this.props.username
                });
                console.log(tweets);
                this.setState({ tweets });
            })
            .then(() => {
                this.props.updateCount();
            })
        // setTimeout(() => {
        //     this.props.updateCount();
        // }, 100)
    }

    tweetCreate(event) {
        event.preventDefault();

        const message = event.target.post.value;
        event.target.post.value = '';
        const image = document.getElementById('tweet-img').files[0];
        const formData = new FormData();
        
        if (message.length > 0) {
            formData.append('tweet[message]', message);
        };
        if (image !== undefined) {
            formData.append('tweet[image]', image, image.name);
        };

        fetch(`/api/tweets`, safeCredentialsFormData({
            method: 'POST',
            body: formData,
        }))
            .then(handleErrors)
            .then(response => {
                // console.log(response);
            })
            .then(() => {
                const button = document.getElementById('btn-tweet-create');
                const preview = document.getElementById('preview');

                button.disabled = true;
                preview.classList.add('d-none');
                document.getElementById('tweet-img').value = ''; 
                URL.revokeObjectURL(this.state.src);
                this.setState({ src: ''});
        
                this.updateTweets();
                window.location.replace('/tweets');
            })
    }

    tweetCreateToggle(event) {
        const button = document.getElementById('btn-tweet-create');
        const tweet = event.target.value;

        if (tweet.length > 0) {
            button.disabled = false;
        } else button.disabled = true;
    }

    imagePreview(event) {
        const image = event.target.files[0];
        const preview = document.getElementById('preview');
        if (image !== undefined) {
            const src = URL.createObjectURL(image);
            preview.src = src;
            preview.classList.remove('d-none');
            this.setState({ src });
        }
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
                this.updateTweets();
            })
        // setTimeout(() => {
        // this.updateTweets();
        // }, 100);
    }

    render() {
        const { tweets } = this.state;
        const { username, accountUsername } = this.props;

        return (
            <React.Fragment>
                <div className="col-12 col-md-6 offset-md-1 py-3">
                    <div className="row">
                        <div className="col-12">
                            <form onSubmit={this.tweetCreate}>
                                <div className="form-floating position-relative">
                                    <textarea name="post" id="tweet-post" className="form-control" style={{ height: 150 }}
                                    onChange={this.tweetCreateToggle}
                                    ></textarea>
                                    <label htmlFor="tweet-post">Post a tweet here!</label>
                                    <div className="position-absolute" id="btn-tweet">
                                        <label className="btn btn-outline-info btn-sm">
                                            <input type="file" id="tweet-img" name="image" accept="image/*" 
                                            onChange={this.imagePreview}/>
                                            <i className="far fa-images"></i>
                                            &ensp;Upload Image
                                        </label>
                                        <img className="d-none mx-2" style={{maxHeight: 50, maxWidth: 100}} id="preview" src="#" />
                                        <button className="btn btn-primary ms-3" id="btn-tweet-create" disabled>Tweet</button>
                                    </div>
                                </div>


                            </form>
                        </div>
                        <div className="col-12 my-5" id="tweet-area">
                            {tweets.map(tweet => {
                                return (
                                    <div className="tweet my-2 p-2 position-relative" key={tweet.id} data-key={tweet.id}>
                                        <div className="pb-2 user fw-bold fs-6">
                                            <span>{tweet.username}</span>
                                            <span className="subuser text-muted ps-1">@{tweet.username}</span>
                                        </div>
                                        <div className="message">{tweet.message}</div>
                                        {tweet.image && <img src={tweet.image} className="mt-2 mx-auto d-flex" style={{ maxHeight: 200 }} alt="Image" />}

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

export default FeedUser;