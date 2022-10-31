import "./components/styles/App.css";
import { useState, useEffect } from "react";

import FormForToday from "./components/OneCityToday/FormForToday";
import ShowWeather from "./components/OneCityToday/ShowWeather";

import FormForFiveDay from "./components/FiveDayWeatherForecast/FormForFiveDay";
import SingleForeCast from "./components/FiveDayWeatherForecast/SingleForeCast";

function App() {
  const MY_KEY = "f022c33ee86d34a1f3990d783484c420";
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [foreCastCity, setForeCastCity] = useState('');
  const [fiveDays, setFiveDays] = useState([]);

  const todayWeatherSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${MY_KEY}&units=metric&lang=de`
    );
      const data = await response.json();
      const obj = {
        description: data.weather[0].description,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        icon: data.weather[0].icon,
        country: data.sys.country,
        city: data.name,
      }
      const newWeather = [...weatherData, obj];
      setWeatherData(newWeather);
      localStorage.setItem('cities', JSON.stringify(newWeather));
      setInput('');
    } catch(error) {
      console.log(error);
    }
  };

  const foreCastSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${foreCastCity}&appid=${MY_KEY}&units=metric&lang=de&exclude=current,minutely,hourly,alerts`
      );
      const data = await response.json();
      const newData = data.list.filter(item => {
        return item.dt_txt.includes("12:00:00")
      })
      
      const fiveDayData = newData.map(item => {
        return {
          city: data.city.name,
          country: data.city.country,
          temp: item.main.temp,
          feelsLike: item.main.feels_like,
          date: item.dt_txt,
          description: item.weather[0].description,
          icon: item.weather[0].icon
        }
      })
      setFiveDays(fiveDayData);
      setForeCastCity('');
      localStorage.setItem('foreCast', JSON.stringify(fiveDayData));
    } catch(error) {
      console.log(error);
    }
  }
  
  if (weatherData.length >= 6) {
    setWeatherData(weatherData.slice(1))
  }
  
  useEffect(() => {
    const storageWeather = localStorage.getItem('cities');
    const storageFiveDays = localStorage.getItem('foreCast');
    const fiveDays = JSON.parse(storageFiveDays);
    const weather = JSON.parse(storageWeather);
    if (weather !== null || fiveDays !== null) {
      setWeatherData(weather);
      setFiveDays(fiveDays);
  }
  }, []);
  

  return (
    <div className="App">
      {/* Forecast for the next five days for one city */}
      <div className="fiveDayWeatherForecast">
      <h3>Weather forecast for the next 5 days for one city</h3>
        <FormForFiveDay
          foreCastCity={foreCastCity}
          setForeCastCity={setForeCastCity}
          foreCastSubmitHandler={foreCastSubmitHandler}
        />
        <ul className="fiveDaysFC">
          {fiveDays.map((day, i) => 
            <SingleForeCast
              day={day}
              key={i}
            />
          )}
        </ul>
      </div>
      {/* Forecast for today for one City */}
      <div className="todayWeatherForecast">
        <h3>Current weather forecast for up to 5 cities</h3>
        <FormForToday
          input={input}
          setInput={setInput}
          weatherData={weatherData}
          setWeatherData={setWeatherData}
          MY_KEY={MY_KEY}
          todayWeatherSubmitHandler={todayWeatherSubmitHandler}
        />
        <ul className="formUl">
            {weatherData.map((obj, i) => 
              <ShowWeather
                weatherData={obj}
                key={i}
              />
            )}
        </ul>        
      </div>
    </div>
  );
}

export default App;

// https://api.openweathermap.org/data/2.5/weather?q=Solingen&appid=f022c33ee86d34a1f3990d783484c420&units=metric&lang=de

// https://api.openweathermap.org/data/2.5/forecast?q=Solingen&appid=f022c33ee86d34a1f3990d783484c420&units=metric&lang=de&exclude=current,minutely,hourly,alerts

