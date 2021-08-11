import React from 'react';
import FirstDigit from '../Components/FirstDigit';
import SecondDigit from '../Components/SecondDigit';
import ThirdDigit from '../Components/ThirdDigit';
import FourthDigit from '../Components/FourthDigit';
import { CSSTransitionGroup } from 'react-transition-group';


class ConfigPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m1: 0,
      m2: 0,
      s1: 0,
      s2: 0,
    }
  }

  startCounterCall = () => {
    const { m1,m2,s1,s2 } = this.state;
    const { startCounter } = this.props;
    startCounter(`${m1}${m2}${s1}${s2}`)
  }

  updateValues = (timeIndex, value) => {
    this.setState({
      [timeIndex]: value,
    })
    console.log(value);
  }

  render() {
    const { m1,m2,s1,s2 } = this.state;
    const sum = m1+m2+s1+s2 > 0;
    return (
      <div className="config-page-div">
      <div className="tip-div">
      </div>
      <div className='main-div'>
      <FirstDigit updateValues={this.updateValues} />
      <SecondDigit updateValues={this.updateValues} />
      <h1 className="colon">:</h1>
      <ThirdDigit updateValues={this.updateValues} />
      <FourthDigit updateValues={this.updateValues} />
    </div>
    <div className="counter-button-div">
    <CSSTransitionGroup
          transitionName="item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {sum ? <span className="button-start"><a onClick= {this.startCounterCall} href="#"></a></span> : ""}
        </CSSTransitionGroup>
    </div>
    </div>
    )
  }
}

export default ConfigPage