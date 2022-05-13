import React from 'react';

import './WallboardManagement.css';

import Logger from '../../../../../../src/util/Logger';
import Configuration from '../../../../../../src/conf/Configuration';

export class WallboardInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      wallboards : "empty"
    }
  }

  render(){
    return(
      <div>
        Wallboard
      </div>
    )
  }
}

export default WallboardInfo;