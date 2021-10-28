//// Import Example: import {UserInformationFormComponent} from './Components/UserInformationForm/UserInformationFormComponent';
//// Embed in UI : <UserInformationFormComponent/>

import React from 'react';

import './UserInformationFormComponent.css';

import Logger from '../../src/util/Logger';
import UserInformationSubmitClient from '../../src/http/clients/UserInformationSubmitClient';
import Configuration from '../../src/conf/Configuration';

export class UserInformationFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: 'example@gmail.com',
      usernameValue: 'cool name'
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState(
      {
        emailValue: event.target.value
      }
    );
  }

  handleUsernameChange(event) {
    console.log(event)
    this.setState(
      {
        usernameValue: event.target.value
      }
    );
  }

  handleSubmit(event) {
    var userSubmitClient = new UserInformationSubmitClient(
      `${Configuration.remoteEndpoint}`
    );
    userSubmitClient.submitUserRequest(this.state.emailValue, this.state.usernameValue);
    Logger.info(`State: ${this.state.emailValue}, username: ${this.state.usernameValue}`);
    
    event.preventDefault();
  }

  render() {
    return (
      <div class="userFormWrapper">
      <form onSubmit={this.handleSubmit}>
        <label for="emailInput" class="userInfoInputLabel">
          Email:
        </label>
        <textarea class="userInfoInput" id="emailInput" value={this.state.emailValue} onChange={this.handleEmailChange} />
        <br />
        <label for="usernameInput" class="userInfoInputLabel">
          Username:
        </label>
        <textarea class="userInfoInput" id="usernameInput" value={this.state.usernameValue} onChange={this.handleUsernameChange} />
        <br />
        <input class="userInfoSubmitButton" type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default UserInformationFormComponent;