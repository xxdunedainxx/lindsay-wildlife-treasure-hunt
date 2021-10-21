import React from 'react';

import {PageBody} from '../../PageBody/PageBody';
import {WinDisplay} from '../../WinDisplay/WinDisplay';

export class WinPage extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div>
         <PageBody />
         <WinDisplay />
      </div>
    );
  }
}

export default WinPage;



