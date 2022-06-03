// Partial Info list about a bird. // Displays full information about a bird

import React from 'react';

import Logger from '../../../../../../../../src/util/Logger';
import AAAConfiguration from '../../../../conf/AAAConfiguration' 

export class BirdInfo extends React.Component {
  constructor(props) {
    super(props);

    this.parentReference = props.parentReference

    this.state = {
      name: props.name,
      description: props.description,
      species: props.species,
      photo: props.photo,
      map: props.map,
      call: props.call,
      indexNumber: props.indexNumber,
    }

    this.onClickFocusBird = this.onClickFocusBird.bind(this)
  }

  onClickFocusBird(){
    Logger.info(`Focusing on ${this.state.indexNumber}`)
    this.parentReference.setFocusedBirdProfile(this.state.indexNumber)
  }

  render() {
    return (
      <div onClick={this.onClickFocusBird}>
        <img src={this.state.photo} /><br/>
        <b>{this.state.name}, {this.state.species}</b>
        <br />
        {this.state.description}
      </div>
    );
  }
}

export default BirdInfo;