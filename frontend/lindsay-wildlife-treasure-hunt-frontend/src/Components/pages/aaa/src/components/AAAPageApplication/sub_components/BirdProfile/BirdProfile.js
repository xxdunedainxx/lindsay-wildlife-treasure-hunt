// Displays full information about a bird

import React from 'react';

import Logger from '../../../../../../../../src/util/Logger';
import AAAConfiguration from '../../../../conf/AAAConfiguration' 

export class BirdProfile extends React.Component {
  constructor(props) {
    super(props);

    this.parentReference = props.parentReference

    this.state = {
      name: props.name,
      description: props.description,
      species: props.species,
      photo: props.photo,
      map: props.map,
      call: props.call
    }

    this.onClickExitFocusedBird = this.onClickExitFocusedBird.bind(this)
    this.onClickPlayDescription = this.onClickPlayDescription.bind(this)
  }

  onClickExitFocusedBird(){
    this.parentReference.unsetFocusedBirdProfile()
  }

  onClickPlayDescription(){
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.state.description));
  }

  render() {
    return (
      <div>
        <button onClick={this.onClickExitFocusedBird}>X</button>
        <br/>
        <img src={this.state.photo} /><br/>
        <b>{this.state.name}, {this.state.species}</b>
        <br />
        <button onClick={this.onClickPlayDescription}>Play description audio</button> {this.state.description} 
        <br />
        <h3>Below is a map of where they can be found:</h3>
        <img src={this.state.map} /><br/>
        <h3>Calls</h3>
        <audio controls autoplay>
          <source src={this.state.call} type="audio/mpeg" />
          Something went wrong?
        </audio>
      </div>
    );
  }
}

export default BirdProfile;