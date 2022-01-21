import React from 'react';
import TestRenderer from 'react-test-renderer'; // ES6 
import ReportBugPage from '../../../../src/Components/pages/report/ReportBugPageComponent';
import { render } from "@testing-library/react";
//https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
test('Report a bug render DOM test', () => {

  const { container, getByText, getByTestId } = render(
    <ReportBugPage />
  );
  expect(getByText('Having an issue? We want to hear your feedback:')).toBeInTheDocument()
  expect(getByTestId('test-report-bug-header')).toBeInTheDocument()
  expect(getByTestId('test-report-bug-container')).toBeInTheDocument()
});


test('Report Issue Sub-component display testing', () => {

  const { container, getByText, getByTestId } = render(
    <ReportBugPage />
  );
  
  const reportIssueDisplay = getByTestId('test-issue-display-container')
  expect(reportIssueDisplay).toHaveClass('reportAnIssueWrapper')

  const reportIssueForm = getByTestId("test-issue-display-form")
  expect(reportIssueForm).toBeInTheDocument()
});
