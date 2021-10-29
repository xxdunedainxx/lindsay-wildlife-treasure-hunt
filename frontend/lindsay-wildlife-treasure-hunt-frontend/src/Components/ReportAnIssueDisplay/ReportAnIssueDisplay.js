//// Import Example: import {UserInformationFormComponent} from './Components/UserInformationForm/UserInformationFormComponent';
//// Embed in UI : <UserInformationFormComponent/>

import React from 'react';

import './ReportAnIssueDisplay.css';

import Logger from '../../src/util/Logger';
import ReportAnIssueClient from '../../src/http/clients/ReportAnIssueClient';
import Configuration from '../../src/conf/Configuration';

export class ReportAnIssueDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Something isn't working"
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleMessageChange(event) {
    this.setState(
      {
        message: event.target.value
      }
    );
  }

  handleSubmit(event) {
    var reportIssueClient = new ReportAnIssueClient(
      `${Configuration.remoteEndpoint}`
    );
    reportIssueClient.report(this.state.message);
    Logger.info(`message: ${this.state.message},`);
  }

  render() {
    return (
      <div class="reportAnIssueWrapper">
        <form onSubmit={this.handleSubmit}>
          <label for="describeIssueInput" class="userInfoInputLabel">
            Describe your issue:
          </label>
          <textarea class="userInfoInput" id="describeIssueInput" value={this.state.message} onChange={this.handleMessageChange} />
          <br />
          <input class="userInfoSubmitButton" type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default ReportAnIssueDisplay;