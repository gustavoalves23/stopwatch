import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

class SecondDigit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isHovered: false,
    }
  }

  updateDigitValue = ({ currentTarget }) => {
    const { updateValues } = this.props;
    switch(currentTarget.name) {
      case 'add':
        this.setState ((previousState) => ({
          value: previousState.value + 1,
        }))
    updateValues('m2', this.state.value + 1);
        break;
      case 'decrease' :
        this.setState ((previousState) => ({
          value: previousState.value - 1,
        }))
    updateValues('m2', this.state.value - 1);
        break;
      default:
        console.log('error');     
    }
  }


  buttonIncrease = () => {
    if (this.state.isHovered) {
      return (
        <button 
        className={this.state.value < 9 ? "digit-value-change-button increase-button" : "digit-value-change-button disabled" }
        name="add" 
        onClick={ this.state.value < 9 ?  this.updateDigitValue : () => {} } >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )
    }
  }

  buttonDecrease = () => {
    if (this.state.isHovered) {
      return (
        <button 
        className={this.state.value > 0 ? "digit-value-change-button decrease-button" : "digit-value-change-button disabled" }
        name="decrease" 
        onClick={ this.state.value > 0 ? this.updateDigitValue : () => {} } >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      )
    }
  }

  render() {
    return (
      <div
      className="digit-input-div"
      onMouseEnter={() => this.setState({isHovered : true})}
      onMouseLeave={() => this.setState({isHovered: false})}
      >
      <div className="button-div">
      {this.buttonIncrease()}
      </div>
      <p className="digit-value">{ this.state.value }</p>
      <div className="button-div">
      {this.buttonDecrease()}
      </div>
      </div>
    )
  }
}

export default SecondDigit;