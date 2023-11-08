import React, { useState } from 'react'
import './weather.css'
import searchIcon from '../assets/search.png'
import rainIcon from '../assets/rain.png'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'
import humidityIcon from '../assets/humidity.png'

const Weather = () => {
    let APIkey = "9b9b3be949bb4acb679ed1307156cb06";
    const [location,setLocation]=useState('')
      const [wicon, setWicon] = useState(cloudIcon);
    const [datas, setDatas] = useState({
      humidity: 0,
      wind: 0,
      temp: 0,
      location: "Search temprature",
    });
    const search = async () => {
      console.log(location);
      if (location.length <= 0) {
        return 0;
      }
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${APIkey}`;
      let res = await fetch(url);
      let data = await res.json();

      setDatas({
        ...datas,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temp: data.main.temp,
        location: data.name,
      });
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clearIcon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(cloudIcon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(drizzleIcon);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(drizzleIcon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWicon(rainIcon);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWicon(rainIcon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(snowIcon);
      }else{
        setWicon(clearIcon)
      }
      
    };
  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          onChange={(e) => setLocation(e.target.value)}
          placeholder="search"
        />
        <div className="search-icon">
          <img src={searchIcon} alt="searchIcon" onClick={() => search()} />
        </div>
      </div>
      <div className="weather-img">
        <img src={wicon} alt="icon" />
      </div>
      <div className="weather-temp">{datas.temp}°c</div>
      <div className="weather-loc">{datas.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} className="icon" alt="" />
          <div className="data">
            <div className="humid-percent">{datas.humidity} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} className="icon" alt="" />
          <div className="data">
            <div className="humid-percent">{datas.wind} KMpH</div>
            <div className="text">wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather
