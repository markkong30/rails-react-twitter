import React from "react";
import ReactDOM from "react-dom";
import { safeCredentials, handleErrors } from '../utils/fetchHelper';

class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',

    };
    this.userCreate = this.userCreate.bind(this);
    this.updateSignUpForm = this.updateSignUpForm.bind(this);
    this.sessionCreate = this.sessionCreate.bind(this);
    this.updateSignInForm = this.updateSignInForm.bind(this);
  }

  componentDidMount() {
    fetch(`/api/authenticated`)
      .then(handleErrors)
      .then(response => {
        if (response.authenticated) {
          this.setState({ username: response.username });
          window.location.replace('/tweets');
        }
      })
  }

  sessionCreate(event) {
    event.preventDefault();
    const { username, password } = this.state;

    fetch(`/api/sessions`, safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        }
      })
    }))
      .then(handleErrors)
      .then(response => {
        console.log(response);
        if (response.success) {
          window.location.replace('/tweets');
        } else {
          const forms = document.querySelectorAll('.sign-in .form-control');

          Array.prototype.slice.call(forms).forEach(form => {
            form.classList.add('is-invalid')
          })
        }
      })

  }

  userCreate(event) {
    event.preventDefault();
    const { username, email, password } = this.state;

    fetch(`/api/users`, safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
        }
      })
    }))
      .then(handleErrors)
      .then(response => {
        console.log(response);
        if (response.success !== false) {
          //window.location.replace('/tweets');
          this.sessionCreate(event);
        }
      })

  }

  updateSignInForm(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });

  }

  updateSignUpForm(event) {
    const forms = document.querySelectorAll('.sign-up .form-control');

    Array.prototype.slice.call(forms).forEach(form => {
      if (form.checkValidity()) {
        form.classList.add('is-valid')
        form.classList.remove('is-invalid')
      } else {
        if (form.value !== '') {
          form.classList.add('is-invalid')
          form.classList.remove('is-valid')
        }
      }
    })

    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <React.Fragment>
        <div className="col-12 sign-in my-3">
          <form className="needs-validation sign-in" onSubmit={this.sessionCreate} onChange={this.updateSignInForm} noValidate>
            <p className="mb-2">
              <b>Already have an Account?</b>
            </p>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="username" />
              <label>Username</label>
            </div>
            <div className="row">
              <div className="input-group">
                <div className="form-floating col-8">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                  />
                  <label>Password</label>
                </div>
                <button
                  className="btn btn-primary log-in rounded col-3 ms-auto"

                >
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* sign up */}

        <div className="col-12 my-3">
          <form className="needs-validation sign-up" onSubmit={this.userCreate} onChange={this.updateSignUpForm} noValidate>
            <p className="mb-2">
              <span>
                <b>New to Twitter?</b>
              </span>
              <span className="ps-3 text-muted">Sign up here!</span>
            </p>

            <div className="form-group">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control mb-3"
                  name="username"
                  pattern=".{3,}"
                  required
                />
                <label htmlFor="username">Username</label>

              </div>

              <div className="form-floating">
                <input
                  type="email"
                  className="form-control mb-3"
                  name="email"
                  pattern=".{5,}"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control mb-3"
                  name="password"
                  pattern=".{8,}"
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <button className="btn btn-primary">Sign up</button>
            </div>

          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Sign;
