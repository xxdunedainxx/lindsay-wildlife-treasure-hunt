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
    let messageToUse = props?.inputBodyText ? props.inputBodyText : "Something isn't working"
    let messageHeader = props?.messageHeader ? props.messageHeader : "Describe your issue:"
    this.state = {
      message: messageToUse,
      messageHeader: messageHeader
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
    event.preventDefault()
    var reportIssueClient = new ReportAnIssueClient(
      `${Configuration.remoteEndpoint}`
    );
    reportIssueClient.report(this.state.message);
    Logger.info(`message: ${this.state.message},`);
  }

  render() {
    return (
      <div class="reportAnIssueWrapper" data-testid="test-issue-display-container">
        <form onSubmit={this.handleSubmit} data-testid="test-issue-display-form">
          <label for="describeIssueInput" class="userInfoInputLabel">
            {this.state.messageHeader}
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