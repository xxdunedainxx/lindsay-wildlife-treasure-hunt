import React from 'react';

import Logger from '../../../../../../src/util/Logger';
import Configuration from '../../../../../../src/conf/Configuration';
import AAAConfiguration from '../../conf/AAAConfiguration';
import BirdProfile from './sub_components/BirdProfile/BirdProfile';
import BirdInfo from './sub_components/BirdInfo/BirdInfo';
import TodaysDate from'./sub_components/TodaysDate/TodaysDate';

export class AAAPageApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topMessage: "Loading...",
      ready     : false,
      profiles  : null,
      focusBirdProfile: null,
    }
    AAAConfiguration.Init()
  }

  componentDidMount(){
    this.setState(
      {
        ready           : true,
        topMessage      : AAAConfiguration.aaaData["topMessage"],
        profiles        : AAAConfiguration.aaaData["aaaConfigs"],
        focusBirdProfile: null,
      }
    )
    Logger.info("AAA Page loaded")
  }

  setFocusedBirdProfile(indexNumber) {
    this.setState(
      {
        focusBirdProfile: this.state.profiles[indexNumber]
      }
    )
  }

  unsetFocusedBirdProfile(){
    this.setState(
      {
        focusBirdProfile: null
      }
    )
  }

  __renderSubPage(){
    if(this.state.ready){
       if(this.state.focusBirdProfile != null){
         return this.__renderBirdProfile()
       } else {
        return this.__renderBirdInfo()
       }                
    } else {
      return ('Loading...')
    }
  }

  __renderBirdInfo(){
    // Renders BirdInfo page  with all of the 'high level' info of each bird 
    let profilesToIter = Object.entries(this.state.profiles)

    console.log(profilesToIter)
    let rBirds = profilesToIter.map(
      (([key, value]) =>
        <BirdInfo 
          parentReference={this}
          name={value.name}
          species={value.species}
          description={value.description}
          photo={value.photo}
          map={value.map}
          call={value.call}
          indexNumber={key}
        />
      )
    )
    return rBirds
  }

  __renderBirdProfile(){
    return (
      <BirdProfile 
        name={this.state.focusBirdProfile.name}
        species={this.state.focusBirdProfile.species}
        description={this.state.focusBirdProfile.description}
        photo={this.state.focusBirdProfile.photo}
        map={this.state.focusBirdProfile.map}
        call={this.state.focusBirdProfile.call}
        parentReference={this}
      />
    )
  }


  render() {
    return (
      <div class="aaaHome">
       <br />
       <h3>{this.state.topMessage}</h3>
       <br />
       {this.__renderSubPage()}
      </div>
    );
  }
}

export default AAAPageApplication;