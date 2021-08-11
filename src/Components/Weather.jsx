import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

import estados from '../Content/estados-cidades';
import Icon from '@mdi/react'
import { mdiThermometer, mdiTemperatureCelsius, mdiWaterPercent } from '@mdi/js'

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      stateName: '',
      city: [],
      cityLoaded: false,
    }
  }

  randomCityTimer =  async () => {
    const randomState = estados[Math.floor(Math.random() * estados.length)];
    const randomCity = randomState.cidades[Math.floor(Math.random() * randomState.cidades.length)];
    this.setState({
      cityName: randomCity,
      stateName: randomState.sigla,
    })
    this.fetchWeather();
    setTimeout(() => {
      this.setState({
        cityLoaded: false,
      })
    }, 5000)
  }

  fetchWeather = () => {
    const { cityName,stateName } = this.state;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e2660281b0684a3d7d0da87089e7a825`)
    .then((response) => response.json())
    .then((city) =>{
      if (city.cod !== "404") {
        this.setState({
          city: (
            <div>
            <h1>{ `${city.name}, ${stateName}` }</h1>
            {/* <img className="weather-icon" src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`} alt="" /> */}
            <h1> 
              <Icon size={1.2} path={mdiThermometer}/> <span>{ `${Math.round(city.main.temp) - 273}` }</span><Icon size={1.2} path={mdiTemperatureCelsius} />
            </h1>
            <h1>
            <Icon size={1.2} path={mdiWaterPercent}/> <span>{ city.main.humidity } %</span>
            </h1>
            </div>
          ),
          cityLoaded: true,
        })
      } else {
        this.randomCityTimer();
      }
      console.log(city);
    })
    .catch((error) => console.log(error))
  }

  componentDidMount() {
    setInterval(() => {
      this.randomCityTimer();
    },6000);
  }

  render() {
    const { cityName, cityWeatherInfo, cityLoaded, city } = this.state;
    return (
      <div className="weather-full-div">
          <CSSTransitionGroup
          component="div"
          transitionName="example"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
          { cityLoaded && city  }
        </CSSTransitionGroup>
       
    </div>
    )
  }
}

export default Weather;