import React, { useState } from 'react';

const Weather = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = {
    key: "45d4257e89d1e0c2c5467d13424a6a33",
    base: "https://api.openweathermap.org/data/2.5/"
  };

  const search = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      setError(null);

      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => response.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          setLoading(false);
          console.log(result);
        })
        .catch(error => {
          setError('Error fetching weather data');
          setLoading(false);
          console.error('Error fetching weather data:', error);
        });
    }
  };

  return (
    <div>
      <main>
        <div className='search_box'>
          <input
            type="text"
            className='search_bar'
            placeholder='Search Here.....'
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {(typeof weather.main !== "undefined") && (
          <div className="location_box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="temperature">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather_description">
              {weather.weather[0].description}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Weather;
