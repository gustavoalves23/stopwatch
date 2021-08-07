import React from 'react';

class TimerPage extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      minute1: Number(value.substring(0,1)),
      minute2: Number(value.substring(1,2)),
      second1: Number(value.substring(2,3)),
      second2: Number(value.substring(3,4)),
    }
  }

  render() {
    const {minute1, minute2, second1, second2 } = this.state;
    return (
      <div>
        <h1>
          <span>{ minute1 }</span>
          <span>{ minute2 }</span>
          <span>{ second1 }</span>
          <span>{ second2 }</span>
        </h1>
      </div>
    )
  }
}

export default TimerPage;