import './App.css';
import ConfigPage from './Pages/ConfigPage';
import TimerPage from './Pages/TimerPage';
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';
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

  stopCounter = () => {
    this.setState ({
      timer: false,
    })
    setTimeout(() => {
      this.setState({
        config: true,
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

  componentDidMount() {
    document.title="Stopwatch"
  }

  timerPageCondition = () => {
    const { timer, value } = this.state;
    if (timer) {
      return (
        <TimerPage value={value} stopCounter={ this.stopCounter } />
      )
    }
  }

  render() {
    const { config } = this.state;
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
        <footer className="footer">
          <a target="_blank" href="https://github.com/gustavoalves23">
            <Icon className={ config ? "conditional-git-icon" : "git-icon" } size={3} path={ mdiGithub } />
          </a>
        </footer>
    </div>
   )
  }
}
export default App;
