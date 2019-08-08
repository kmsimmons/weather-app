import React from 'react'
import Titles from './Components/Titles'
import Form from './Components/Form'
import Weather from './Components/Weather'
import './App.css'

  export default class App extends React.Component {
    state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }

    getWeather = async (e) => {
      e.preventDefault()
      const city = e.target.elements.city.value;
      const country = e.target.elements.country.value
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=API_key`)
      const response = await api_call.json()
      console.log(response);
      const celsius = response.main.temp - 273
      const fahrenheit = Math.floor(celsius * (9/5) + 32)
        if(city && country){
          this.setState({
            temperature: ' ' + fahrenheit + '°F',
            city: ' ' + response.name,
            country: ' ' + response.sys.country,
            humidity: ' ' + response.main.humidity + '%',
            description: ' ' + response.weather[0].description,
            error: ''
          })
        } else {
            this.setState({
              error: "Please fill out all fields"
            })
          }
      }

       render() {
          return (
            <div className="wrapper">
              <div className="main">
               <div className="container">
                <div className="row">
                  <div className="col-xs-5 title-container">
                    <Titles />
                  </div>
                    <div className="col-xs-7 form-container">
                      <Form loadWeather={this.getWeather} />
                      <Weather
                          temperature={this.state.temperature}
                          city={this.state.city}
                          country={this.state.country}
                          humidity={this.state.humidity}
                          description={this.state.description}
                          error={this.state.error}
                      />
                    </div>
                    </div>
                  </div>
                </div>
             </div>
          )
      }
  }
