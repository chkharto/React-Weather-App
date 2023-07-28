import React from 'react';
import '../current weather/currentWeather.css'

const Search = ({ city, handleInputChange, handleSearch }) => {
    return (
        <div className="search">
            <input
                type="text"
                placeholder="enter city name"
                spellCheck="false"
                value={city}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>
                <i className='fas fa-search'></i>
            </button>
        </div>
    )
}

export default Search