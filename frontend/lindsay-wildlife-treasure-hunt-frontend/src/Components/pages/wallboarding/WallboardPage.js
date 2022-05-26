import React from 'react';

import HttpArgParser from '../../../src/util/HttpArgParser';
import Logger from '../../../src/util/Logger';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './WallboardPage.css';

export class WallboardPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      backgroundImage: "none"
    }
    
  }

  componentDidMount(){
    this.__fetchWallboardImage()
  }

  __fetchWallboardImage(){
    Logger.info("Fetching wallboard image from url params..")
    this.setState(
      {
        backgroundImage: HttpArgParser.WALLBOARD_ARG
      }
    )
    Logger.info(`Set url to ${HttpArgParser.WALLBOARD_ARG}`)
    console.log(this.state)
    this.render()
  }


  render(){
    if(this.state.backgroundImage != "none"){
    return (
      <div class="bg" style={{ background: `url(${this.state.backgroundImage})` }}>
        wallboard page
      </div>
    );
   } else {
    return (
      <div>
        Rendering Wallboard image...
      </div>
    )
   } 
  }
}

export default WallboardPage;