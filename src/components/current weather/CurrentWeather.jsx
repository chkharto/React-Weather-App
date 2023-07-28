import React from 'react';
import "./currentWeather.css";
import Search from '../search/Search';

import images from '../../images'

const CurrentWeather = ({ error, weatherData, weatherName, city, handleInputChange, handleSearch }) => {
    return (
        <>
            <div className='card'>
                <Search
                    city={city}
                    handleInputChange={handleInputChange}
                    handleSearch={handleSearch}
                />
                {error && <div className="error">Invalid city name</div>}
                {weatherData && (
                    <div className="weather">
                        <img
                            src={images[weatherName]}
                            className="weather-icon"
                            alt={weatherData.weather[0].main}
                        />
                        <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
                        <h2 className="city">{weatherData.name}</h2>
                        <div className="details">
                            <div className="col">
                                <img src={images.humidity} alt="" />
                                <div>
                                    <p className="humidity">{weatherData.main.humidity}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                            <div className="col">
                                <img src={images.wind} alt="" />
                                <div>
                                    <p className="wind">{weatherData.wind.speed} km/h</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CurrentWeather;