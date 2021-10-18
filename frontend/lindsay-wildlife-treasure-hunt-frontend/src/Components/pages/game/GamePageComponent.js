import React from 'react';
import './GamePageComponent.css';

import {PageBody} from '../../PageBody/PageBody';
import {GameDisplay} from '../../GameDisplay/GameDisplay';

export class GamePage extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div>
         <PageBody />
        <GameDisplay />
      </div>
    );
  }
}

export default GamePage;



