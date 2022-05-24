import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './AAAPageComponent.css';

import Configuration from '../../../src/conf/Configuration';
import AAARouter from './src/AAARouter';

export class AAAPage extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div className="aaa-page-container">
       <h1>Aviary Page</h1>
        <AAARouter/>
      </div>
    );
  }
}


export default AAAPage;