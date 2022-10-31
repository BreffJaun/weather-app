const ShowWeather = ({ weatherData }) => {

  const dayDate = new Date()
  const dateLocal = dayDate.toLocaleDateString('de-DE');
  const bgColor = {
    "backgroundColor":
      weatherData.temp > -10 && weatherData.temp <= 0
      ? 'rgba(50,97,214, 0.4)'
      : weatherData.temp > 1 && weatherData.temp <= 15
      ? 'rgba(244,244,244, 0.4)'
      : weatherData.temp > 16 && weatherData.temp <= 25
      ? 'rgba(244,204,0, 0.4)'
      : weatherData.temp > 26
      ? 'rgba(216,128,48, 0.4)'
      : ''
    };

  return (
    <div className="singleWeatherData" style={bgColor}>
      <h3>{`Wettervorhersage für  
      ${weatherData.city}, 
      ${weatherData.country}.`}</h3>
      <p>{`Datum: 
      ${dateLocal}`}</p>
      <p>{`Es werden 
      ${weatherData.temp} °C, (gefühlt 
      ${weatherData.feelsLike} °C).`}</p>
      <p>{`Das Wetter wird: 
      ${weatherData.description}`}</p>
      <img
        className='weatherIcon'
        src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
        alt="TWeatherPic" />
    </div>
  )
}

export default ShowWeather;


