import React from "react";
import ReactDOM from "react-dom";
import Sign from "../src/Layouts/sign";
import "./home.scss";
import twitter_pic from "../../assets/images/twitter.png";


const Home = (props) => (

  <div id="home">
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <a href="/"><span className='nav-logo'>
          <i className="fab fa-twitter"></i></span>
        </a>
        <span className="navbar-item">Language: English</span>
      </div>
    </nav>

    <div className="container">
      <div className="row justify-content-center my-3">
        <div className="col-7 my-3">
          <h1>Welcome to Twitter.</h1>
          <p className="me-5">
            Connect with your friends — and other fascinating people. Get
            in-the-moment updates on the things that interest you. And watch
            events unfold, in real time, from every angle.
          </p>
          <img src={twitter_pic} alt="Twitter Picture" className="my-3 w-75 rounded-2" />
        </div>
        <div className="col-4 my-3">
          <div className="row">
            <Sign />
          </div>
        </div>

      </div>
    </div>
  </div>

);

// document.addEventListener("DOMContentLoaded", () => {
//   ReactDOM.render(
//     <Home />,
//     document.body.appendChild(document.createElement("div"))
//   );
// });

export default Home;

