import React from 'react';
import TestRenderer from 'react-test-renderer'; // ES6 
import HomePage from '../../../../src/Components/pages/home/HomePageComponent';
import Session from '../../../../src/src/util/Session';
import { render } from "@testing-library/react";
//https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


test('Home Page Render Test', () => {
  const { container, getByText, getByTestId, queryByTestId } = render(
    <Router>
      <HomePage />
    </Router>
  );
  expect(getByTestId('test-home-page-no-session')).toBeInTheDocument()
  expect(queryByTestId('test-home-page-session')).not.toBeInTheDocument()
});

test('Home Page Render Test With Session', () => {
  let blankSessionData = {}
  Session.SetSessionData(blankSessionData)

  const { container, getByText, getByTestId, queryByTestId } = render(
    <Router>
      <HomePage />
    </Router>
  );
  
  expect(queryByTestId('test-home-page-no-session')).not.toBeInTheDocument()
  expect(getByTestId('test-home-page-session')).toBeInTheDocument()
});