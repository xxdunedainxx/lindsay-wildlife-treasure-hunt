import React from 'react';

export class TodaysDate extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      today: new Date().toISOString()
    })
  }

  render() {
    return (
      <div>
        {this.state.today}
      </div>
    );
  }
}

export default TodaysDate;