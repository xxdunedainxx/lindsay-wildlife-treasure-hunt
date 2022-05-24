import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AAAHome from './components/AAAHome/AAAHome';

export class AAARouter extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div id="appRouter">
        <Route path='/ui/aaa/home' component={AAAHome} />
      </div>
    );
  }
}

export default AAARouter;