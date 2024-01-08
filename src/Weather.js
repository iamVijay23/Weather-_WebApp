import "./Weather.css";
import React, { useState } from "react";

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = {
    key: "45d4257e89d1e0c2c5467d13424a6a33",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  //  function to search element
  const search = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      setError(null);

      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          setLoading(false);
          console.log(result);
        })
        .catch((error) => {
          setError("Error fetching weather data");
          setLoading(false);
          console.error("Error fetching weather data:", error);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      " August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];

    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date}  ${month} ${year}`;
  };
  return (
    <div className={(typeof weather.main !== "undefined") ?  ((weather.main.temp >16 ) ? "app_hot" :"app_cold" ) : 'default'}>
      <main>
        <div className="search_box">
          <input
            type="text"
            className="search_bar"
            placeholder="Search Here....."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {typeof weather.main !== "undefined" && (
          <div className="location_box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>

            <div className="date">{dateBuilder(new Date())}</div>
          </div>
        )}

        <div className="weather_box">
          <div className="temp">
            {weather && weather.main && typeof weather.main.temp !== "undefined"
              ? `${Math.round(weather.main.temp)} °C`
              : ""}
          </div>
          {weather && weather.weather && weather.weather[0] ? (
            <div className="weather_description">
              {weather.weather[0].description.toUpperCase()}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default Weather;
