import React from 'react';
import './forecast.css';
import images from '../../images';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ forecastData }) => {
  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return <div></div>;
  }

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <>
      {forecastData.list.slice(0, 7).map((item, idx) => (
        <div className="forecast" key={idx}>
          <img
            src={images[item.weather[0].main.toLowerCase() || '']}
            className="forecast-weather-img"
            alt={item.weather[0].main}
          />
          <h1 className="min-max">{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C</h1>
          <h2 className="day">{forecastDays[idx]}</h2>
          <div className="forecast-details">
            <div className="col">
              <img src={images.humidity} alt="" />
              <div>
                <p className="humidity">{item.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={images.wind} alt="" />
              <div>
                <p className="wind">{item.wind.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Forecast;
