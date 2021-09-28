import React from 'react';
import './PageBody.css';

export class PageBody extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div>
        <h1>
        Lindsay Wildlife Experience
        </h1>
        <p style={{ color: "white" }}>
          Welcome to the treasure hunt!
        </p>
        </div>
    );
  }
}

export default PageBody;