import React from 'react';
import './ReportBugPageComponent.css';

import {ReportAnIssueDisplay} from '../../ReportAnIssueDisplay/ReportAnIssueDisplay';


export class ReportBugPage extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div data-testid="test-report-bug-container">
        <h3 data-testid="test-report-bug-header">Having an issue? We want to hear your feedback:</h3>
        <ReportAnIssueDisplay/>
      </div>
    );
  }
}

export default ReportBugPage;