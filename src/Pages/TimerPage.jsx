import React from 'react';
import Weather from '../Components/Weather';

class TimerPage extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    const minutes = (Number(value.substring(0,2)) > 9) ? Number(value.substring(0,2)) : "0" + Number(value.substring(0,2));
    const seconds = (Number(value.substring(2,4)) > 9) ? Number(value.substring(2,4)) : "0" + Number(value.substring(2,4));
    console.log((Number(value.substring(0,2)) * 60) + Number(value.substring(2,4)));
    this.state = {
      timerPause: true,
      minutes,
      seconds,
      time: (Number(value.substring(0,2)) * 60) + Number(value.substring(2,4)),
    }
  }

  timer = () => {
    this.setState((previousState) => ({
      time: previousState.time - 1,
      minutes: (Math.floor(previousState.time / 60) > 9) ? Math.floor(previousState.time / 60) : "0" + Math.floor(previousState.time / 60), 
      seconds: (previousState.time % 60 > 9) ? previousState.time % 60 : "0" + (previousState.time % 60) ,
    }))
  }

  startTimer = () => {
    this.setState({
      timerPause: false,
    })
    this.countdown = setInterval(this.timer, 1000);
  }

  stopTimer = () => {
    clearInterval(this.countdown);
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

  componentDidUpdate() {
    if (this.state.time === - 1) {
      this.stopTimer();
    }
  }

  render() {
    const {minutes, seconds, timerPause } = this.state;
    return (
      <div className="timer-page">
        <div className="weather-div">
          <Weather />
        </div>
        <div className="timer">
          <div className="timerdiv">{ minutes }</div>
          <div className="colondiv" >:</div>
          <div className="timerdiv">{ seconds }</div>
        </div>
        <div className="teste">
        <button 
      className="button--dione button"
        onClick={ timerPause ? this.startTimer : this.pauseTimer } 
      >
        <span>
          { timerPause ? "Retornar" : "Pausar" }
        </span>
      </button>
        </div>  
      </div>
    )
  }
}

export default TimerPage;