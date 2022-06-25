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

import MockData from './dev/MockWallboardImage';

export class WallboardPage extends React.Component {


  constructor(props) {
    super(props)
    this.currentSlideShowIndex = 0
    this.state = {
      backgroundImage: "none"
    }
    
  }

  componentDidMount(){
    this.__fetchWallboardImage()
  }

  __errorMessage(){
    Logger.error("Something happened while setting up the wallboard..")
    this.setState(
      {
        backgroundImage: "error"
      }
    )
  }

  __setSlideShowBackground(profileObject){
    Logger.info("Slideshow shuffling...")
    console.log(profileObject)
    this.__setProvidedUrl(profileObject['images'][this.currentSlideShowIndex])

    this.currentSlideShowIndex++

    if(this.currentSlideShowIndex >= profileObject['images'].length){
      Logger.info("Resetting slide show index..")
      this.currentSlideShowIndex = 0;
    }
  }

  __slideShow(profileObject){
    this.__setSlideShowBackground(profileObject)
    var profileObjectCache = profileObject
    var wallboardObjectCache = this
    setInterval(
      function () {
        wallboardObjectCache.__setSlideShowBackground(profileObjectCache)
    }, 5000 );
  }  

  __processWallboardProfile(profileObject){
    Logger.info("Process Wallboard object..")

    if(profileObject['type'] == "slideshow"){
      Logger.info(`Processing Slideshow, will process per specified interval of ${profileObject.interval}`)
      this.__slideShow(profileObject)
    } else {
      Logger.info("Not slideshow, assuming url")
      this.__setProvidedUrl(profileObject["image"])
    }
  }

  __fetchWallboardProfileAndSetup(profile){
    Logger.info(`Processing profile ${profile}`)
    if(profile == "mockDataOne"){
      Logger.info("Mock Data One")
      this.__processWallboardProfile(MockData.exampleWallboardProfileOne)
    } else if(profile == "mockDataTwo") {
      Logger.info("Mock Data Two")
      this.__processWallboardProfile(MockData.exampleWallboardProfileTwo)
    } else {
      Logger.info("attempting to fetch remote state for wallboard profile..")
    }
  }

  __setProvidedUrl(url){
    this.setState(
      {
        backgroundImage: url
      }
    )
  }  

  __checkWallboardImageType(){
    if(HttpArgParser.WALLBOARD_ARG.substring(0,5) == 'https'){
      Logger.info(`Wallboard url provided, rendering: ${HttpArgParser.WALLBOARD_ARG}`)
      this.__setProvidedUrl(HttpArgParser.WALLBOARD_ARG)
    } else if(HttpArgParser.WALLBOARD_ARG.length > 9 && 
      HttpArgParser.WALLBOARD_ARG.substring(0,9) == 'wprofile:') {
      Logger.info(`Wallboard profile provided, rendering: ${HttpArgParser.WALLBOARD_ARG}`)
      this.__fetchWallboardProfileAndSetup(HttpArgParser.WALLBOARD_ARG.replace('wprofile:', ''))
    } else {
      this.__errorMessage()
    }
  }

  __fetchWallboardImage(){
    Logger.info("Fetching wallboard image from url params..")
    if(HttpArgParser.WALLBOARD_ARG != "none"){
      this.__checkWallboardImageType()
    } else {
      this.__errorMessage()
    }
    Logger.info(`Set url to ${this.state.backgroundImage}`)
    console.log(this.state)
    this.render()
  }


  render(){
    if(this.state.backgroundImage != "none" && this.state.backgroundImage != "error"){
    return (
      <div class="bg" style={{ background: `url(${this.state.backgroundImage})` }}>
      </div>
    );
   } else if(this.state.backgroundImage == "error"){
      return(
        <div class="bg">
          <div class="errorMsg">:( Something went wrong...</div>
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