import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiGithub } from '@mdi/js';

class TimerPage extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    const minutes = (Number(value.substring(0,2)) > 9) ? Number(value.substring(0,2)) : "0" + Number(value.substring(0,2));
    const seconds = (Number(value.substring(2,4)) > 9) ? Number(value.substring(2,4)) : "0" + Number(value.substring(2,4));
    this.state = {
      timerPause: true,
      minutes,
      seconds,
      time: (Number(value.substring(0,2)) * 60) + Number(value.substring(2,4)),
      ended: false,
    }
  }

  timer = () => {
    this.setState((previousState) => ({
      time: previousState.time - 1,
      minutes: (Math.floor(previousState.time / 60) > 9) ? Math.floor(previousState.time / 60) : "0" + Math.floor(previousState.time / 60), 
      seconds: (previousState.time % 60 > 9) ? previousState.time % 60 : "0" + (previousState.time % 60) ,
    }))
    if (this.state.time === - 2) {
      this.stopTimer();
    }
  }

  startTimer = () => {
    this.setState({
      timerPause: false,
    })
    this.countdown = setInterval(this.timer, 1000);
  }

  stopTimer = async () => {
    clearInterval(this.countdown);
    this.setState({
      ended: true,
    })
  }

  pauseTimer = () => {
    this.setState({
      timerPause: true,
    })
    clearInterval(this.countdown);
  }

  componentDidMount() {
    this.startTimer();
  }


  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    const {minutes, seconds, timerPause, ended } = this.state;
    const { stopCounter } = this.props;
    return (
      <div className="timer-page">
        <div className="return">
        <CSSTransitionGroup
          component="div"
          transitionName="in-out-fade"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
          { !ended && <Icon onClick={ stopCounter } className="arrow arrow-disabled" size={ 3 } path={ mdiArrowLeft } /> }
        </CSSTransitionGroup>
        </div>
        <div onClick={ ended ? stopCounter : (timerPause ? this.startTimer : this.pauseTimer) } className={ ended ? 'timer-end' : (timerPause ? 'timer paused' : 'timer') }>
          { !ended && <div className="timerdiv">{ minutes }</div>  }
          <div className="colondiv" >{ ended ? "TIME's UP" : ":" }</div>
          { !ended && <div className="timerdiv">{  seconds }</div> }
        </div>
      </div>
    )
  }
}

export default TimerPage;