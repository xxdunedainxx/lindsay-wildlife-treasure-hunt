import React from 'react';

import Logger from '../../../../../../src/util/Logger';
import Configuration from '../../../../../../src/conf/Configuration';

export class AdminHome extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div class="loginFormWrapper" data-testid="test-login-container">
       Admin Home
      </div>
    );
  }
}

export default AdminHome;