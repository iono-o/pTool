import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";

/** component displays weatheremoji and temperature of input location*/
function Weather() {
  const [inputText, setInputText] = useState("");
  const [location, setLocation] = useState("Berlin");
  const [currWeather, setCurrWeather] = useState(null);
  const [currTemperature, setTemperature] = useState(null);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  async function getCoordinates(city) {
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    if (response.data.results && response.data.results.length > 0) {
      const coordinates = response.data.results[0];
      return coordinates;
    } else {
      console.log("location not found");
      return null;
    }
  }
  async function getWeather(coordinates) {
    if (coordinates) {
      const latitude = coordinates.latitude;
      const longitude = coordinates.longitude;
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
      );
      if (response.data.current) {
        return response.data;
      } else {
        console.log("weather not found");
        return -100;
      }
    } else {
      return null;
    }
  }

  function getWeatherEmoji(weathercode) {
    if ([0].includes(weathercode)) {
      return "🌞";
    } else if ([1, 2, 3].includes(weathercode)) {
      return "⛅";
    } else if ([45, 48].includes(weathercode)) {
      return "🌁";
    } else if ([95, 96, 99].includes(weathercode)) {
      return "⛈️";
    } else if (
      [51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(weathercode)
    ) {
      return "🌦️";
    } else if ([66, 67, 71, 73, 75, 77, 85, 86].includes(weathercode)) {
      return "🌨️";
    } else {
      return "❓";
    }
  }

  async function updateWeather() {
    const coordinates = await getCoordinates(location);
    const weather = await getWeather(coordinates);
    console.log(weather);
    if (weather) {
      // https://open-meteo.com/en/docs?hourly=&current=temperature_2m,weather_code
      setCurrWeather(getWeatherEmoji(weather.current.weather_code));
      setTemperature(weather.current.temperature_2m);
    } else {
      setCurrWeather("❓ could not find location");
      setTemperature(null);
    }
  }

  useEffect(() => {
    updateWeather();
  });

  useEffect(() => {
    updateWeather();
  }, [location]);

  return (
    <div>
      <h3>
        current Location:{" "}
        <span style={{ textDecoration: "underline" }}>{location}</span>
      </h3>
      <input
        type="text"
        onChange={handleChange}
        placeholder="set Location"
        value={inputText}
      />
      <button
        className="custom-button green-button"
        style={{ padding: "3px 7px" }}
        onClick={() => {
          setLocation(inputText);
        }}
      >
        <span>
          <AddBoxIcon />
        </span>
      </button>
      <h1>
        {currTemperature !== null
          ? `${currTemperature}°C - ${currWeather}`
          : "Could not find location"}
      </h1>
    </div>
  );
}

export default Weather;
