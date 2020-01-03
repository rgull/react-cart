import React, { Component } from 'react';
import './login.scss';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    this.props.history.push('./menu');
  };

  render() {
    const { email, password } = this.state;
    return (
      <main className="signin-container">
        <div className="d-flex flex-grow-1 align-items-center justify-content-center">
          <div className="align-self-center">
            <h2>Sign In</h2>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
              />
              <label>
                {' '}
                <input type="checkbox" /> Remember
              </label>
              <div>
                <button type="submit">Sign In</button>
              </div>
            </form>
            <div className="account-link-cont">
              <a href="#">Forgot password</a>
              <a href="#">Have an account</a>
            </div>
          </div>
        </div>

        <footer className="row" />
      </main>
    );
  }
}

export default Login;
