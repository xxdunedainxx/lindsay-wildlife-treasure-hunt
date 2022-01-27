import React from 'react';

import './LordRichard.css';

import Logger from '../../../src/util/Logger';
import LordRichardImage from './LordRichard.png';

export class LordRichard extends React.Component {

  constructor(props) {
    super(props)

    this.lordRichardStyle = {
      width: 325,
      height: 250
    }
  }

  render() {
    return (
      <div id="lord-richard-avatar">
        <img src={LordRichardImage} alt="" style={this.lordRichardStyle} />
      </div>
    )
  }
}

export default LordRichard;