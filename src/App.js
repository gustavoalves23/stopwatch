import './App.css';
import ConfigPage from './Pages/ConfigPage';
import TimerPage from './Pages/TimerPage';
import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: true,
      timer: false,
      value: 0,
    }
  }

  startCounter = (time) => {
    this.setState ({
      config: false,
      value: time,
    })
    setTimeout(() => {
      this.setState({
        timer:true,
      })
    }, 1000)
  }

  configPageCodition = () => {
    const { config } = this.state;
    if (config) {
      return (
        <ConfigPage startCounter={this.startCounter} /> 
      )
    }
  }

  timerPageCondition = () => {
    const { timer, value } = this.state;
    if (timer) {
      return (
        <TimerPage value={value} />
      )
    }
  }
  


  render() {
  return (
    <div>
          <CSSTransitionGroup
          component="div"
          transitionName="example"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
          {this.configPageCodition()}
          {this.timerPageCondition()}
        </CSSTransitionGroup>


    </div>
   )
  }
}
export default App;
