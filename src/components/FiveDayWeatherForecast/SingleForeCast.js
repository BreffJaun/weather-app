const SingleForeCast = ({day}) => {
  
  const dayDate = new Date(day.date)
  const dateLocal = dayDate.toLocaleDateString('de-DE');
  const bgColor = {
    "backgroundColor":
      day.temp > -10 && day.temp <= 0
      ? 'rgba(50,97,214, 0.4)'
      : day.temp > 1 && day.temp <= 15
      ? 'rgba(244,244,244, 0.4)'
      : day.temp > 16 && day.temp <= 25
      ? 'rgba(244,204,0, 0.4)'
      : day.temp > 26
      ? 'rgba(216,128,48, 0.4)'
      : ''
    };

  return (
    <div className="singleWeatherData" style={bgColor}>
      <h3>{`Wettervorhersage für  
      ${day.city}, 
      ${day.country}.`}</h3>
      <p>{`Datum: 
      ${dateLocal}`}</p>
      <p>{`Es werden 
      ${day.temp} °C, (gefühlt 
      ${day.feelsLike} °C).`}</p>
      <p>{`Das Wetter wird: 
      ${day.description}`}</p>
      <img
        className='weatherIcon'
        src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
        alt="TWeatherPic" />
    </div>
  )
}

export default SingleForeCast;

