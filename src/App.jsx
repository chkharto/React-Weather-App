import React, { useState, useEffect } from 'react';
import './App.css';
import CurrentWeather from './components/current weather/CurrentWeather';
import { apiKey, apiUrl } from './api';
import Forecast from './components/forecast/Forecast';

const App = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(false);
  const [city, setCity] = useState('');
  const [show, setShow] = useState(false);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = async () => {
    // Fetch weather data for the given city
    try {
      const response = await fetch(`${apiUrl}/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      if (response.ok) {
        setCurrentWeatherData(data);
        setError(false);
      } else {
        setError(true);
        setCurrentWeatherData(null);
      }
    } catch (error) {
      setError(true);
      setCurrentWeatherData(null);
    }
  };

  // Fetch forecast data whenever the city changes
  useEffect(() => {
    if (city) {
      try {
        const fetchForecast = async () => {
          const response = await fetch(`${apiUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`);
          const data = await response.json();

          if (response.ok) {
            setForecast(data);
          } else {
            setError(true);
            setForecast(null);
          }
        };

        fetchForecast();
      } catch (error) {
        setError(true);
        setForecast(null);
      }
    } else {
      // Reset forecast data if city is empty
      setForecast(null);
    }
  }, [city]);

  const weatherName = currentWeatherData?.weather[0]?.main?.toLowerCase() || '';

  const showForecast = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className='app'>
      {!show && (
        <>
          <CurrentWeather
            error={error}
            weatherData={currentWeatherData}
            weatherName={weatherName}
            city={city}
            handleInputChange={handleInputChange}
            handleSearch={handleSearch}
          />
          {currentWeatherData && <h1 className='h1' onClick={showForecast}>Show More</h1>}
        </>
      )}
      {show && (
        <div className='fore'>
          <Forecast
            forecastData={forecast}
          />
          <h1 className='h1 s' onClick={showForecast}>Show Less</h1>
        </div>
      )}
    </div>
  );
};

export default App;
