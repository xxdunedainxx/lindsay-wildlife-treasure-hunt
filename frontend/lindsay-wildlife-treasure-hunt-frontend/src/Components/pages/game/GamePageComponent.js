import React from 'react';
import './GamePageComponent.css';

import {PageBody} from '../../PageBody/PageBody';
import {QRCodeScanner} from '../../qrcodescanner/QRCodeScanner';

export class GamePage extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div>
         <PageBody />
        <QRCodeScanner />
      </div>
    );
  }
}

export default GamePage;



