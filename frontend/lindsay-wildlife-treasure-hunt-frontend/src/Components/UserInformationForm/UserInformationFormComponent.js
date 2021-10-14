import React from 'react';
import Logger from '../../src/util/Logger';

import './UserInformationFormComponent.css';

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
    this.setState(
      {
        usernameValue: event.target.value
      }
    );
  }

  handleSubmit(event) {
    alert(`State: ${this.state.emailValue}, username: ${this.state.usernameValue}`);
    event.preventDefault();
  }

  render() {
    return (
      <div class="userFormWrapper">
      <form onSubmit={this.handleSubmit}>
        <label for="emailInput">
          Email:
        </label>
        <textarea id="emailInput" value={this.state.emailValue} onChange={this.handleEmailChange} />
        <br />
        <label for="usernameInput">
          Username:
        </label>
        <textarea id="usernameInput" value={this.state.usernameValue} onChange={this.handleUsernameChange} />
        <br />
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default UserInformationFormComponent;