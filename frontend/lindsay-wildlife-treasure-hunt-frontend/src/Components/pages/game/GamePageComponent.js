import React from 'react';
import './GamePageComponent.css';

import {GameDisplay} from '../../GameDisplay/GameDisplay';

export class GamePage extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div>
         <GameDisplay />
      </div>
    );
  }
}

export default GamePage;



