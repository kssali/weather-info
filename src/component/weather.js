import React from "react";
import WeatherInfo from "./weatherInfo";
import { useEffect } from "react";
import { useState } from "react";

const Weather = () => {

const [searchData,setSearchData]=useState("Pune")
const [newWeather,setNewWeather]=useState({})

console.log(newWeather)

const getWeatherInfo=async()=>{
  try {
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchData}&units=metric&appid=22af68bf06313d60c1d6197d5246b493`
    let result=await fetch(url)
    let data = await result.json()

    const {temp,humidity,pressure}=data.main;
    const {main:weathermood}=data.weather[0];
    const {name}=data;
    const {speed}=data.wind;
    const {country,sunset}=data.sys;
    console.log(temp,humidity,pressure,weathermood,name,speed,country,sunset)   
    
    const newWeatherInfoData={
      temp,
      humidity,
      pressure,
      weathermood,
      name,
      speed,
      country,
      sunset
    }
    setNewWeather(newWeatherInfoData)
   
  } catch (error) {
    console.log(error)
    
  }


}

useEffect(()=>{
  getWeatherInfo();
},[])

  return (
    <>
     <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchData}
            onChange={(e)=>setSearchData(e.target.value)}
           
      
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
           
           > Search
          </button>
        </div>
      </div>
     <WeatherInfo {...newWeather}/>
    </>
  );
};

export default Weather;
