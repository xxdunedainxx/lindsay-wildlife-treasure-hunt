import React from 'react';

import './LoginForm.css';

import Logger from '../../../../../../src/util/Logger';
import Configuration from '../../../../../../src/conf/Configuration';

import HttpLogin from '../../http/HttpLogin';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'username',
      password: 'password'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if(event.target.className == "loginInfoFormUsername"){
      this.setState(
        {
          username: event.target.value
        }
      );
    } else {
      this.setState(
        {
          password: event.target.value
        }
      );
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    Logger.info(`Event: ${event}`)
    var login = new HttpLogin(
      `${Configuration.remoteEndpoint}`
    );
    login.login(
      this.state.username,
      this.state.password
    )
  }

  render() {
    return (
      <div class="loginFormWrapper" data-testid="test-login-container">
        Please provide valid username and password to continue: 
        <form onSubmit={this.handleSubmit} data-testid="test-login-form">
          <label for="loginInfoFormUsername" class="usernameLabel">
            Username:
          </label>
          <textarea class="loginInfoFormUsername" id="loginInfoFormUsername" value={this.state.username} onChange={this.handleChange}/>
          <br />
          <label for="loginInfoFormPassword" class="passwordLabel">
            Password:
          </label>
          <textarea class="loginInfoFormPassword" id="loginInfoFormPassword" value={this.state.password} onChange={this.handleChange}/>
          <br />
          <input class="loginSubmitBtn" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default LoginForm;