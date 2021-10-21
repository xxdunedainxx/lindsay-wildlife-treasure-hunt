import React from 'react';
import Configuration from '../../src/conf/Configuration';

export class Version extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      VERSION: Configuration.version
    }
  }

  render(){
    return (
      <div id="versionContainer">
        Version: {this.state.VERSION}
      </div>
    );
  }
}

export default Version;