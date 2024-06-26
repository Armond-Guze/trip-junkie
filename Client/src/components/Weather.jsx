import React, { useState, useEffect } from "react";
import axios from "axios";
import clearImage from '../assets/clear.jpg';
import cloudsImage from "../assets/cloud.jpg";
import rainImage from "../assets/rain.jpg";
import snowImage from "../assets/snow.jpg";
import Destination from "./Destination";
import auth from '../utils/auth';

function Weather({ searchedCity }) {
  const [location, setLocation] = useState(searchedCity || "Dallas");
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=86a6c14c449d6231e1d0c3495c6b76ca`
        );
        setWeatherData(response.data);
        const weatherCondition = response.data.weather[0].main.toLowerCase();
        setBackgroundImage(getBackgroundImage(weatherCondition));
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherData(null);
      }
    };

    fetchWeatherData();
  }, [location]);

  useEffect(() => {
    // Load destinations based on weather data
    if (weatherData) {
      setDestinations([
        { name: "Destination 1" },
        { name: "Destination 2" },
        { name: "Destination 3" }
      ]); 
    }
  }, [weatherData]);

  const handleSearch = () => {
    setLocation(searchQuery);
  };

  const handleCityClick = (cityName) => {
    setSearchQuery(cityName);
  };

  const getBackgroundImage = (weatherCondition) => {
    switch (weatherCondition) {
      case "clear":
        return `url(${clearImage})`;
      case "clouds":
        return `url(${cloudsImage})`;
      case "rain":
        return `url(${rainImage})`;
      case "snow":
        return `url(${snowImage})`;
      default:
        return `url(${clearImage})`;
    }
  };

  const convertToCelsius = (tempCelsius) => {
    return (tempCelsius * 9/5) + 32;
  };

  const handleLike = () => {
    try {
      if (weatherData) {
        // Retrieve existing favorites from local storage
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isExisting = existingFavorites.some(favorite => favorite.id === weatherData.id);
  
        if (isExisting) {
          const addToFavorites = window.confirm('Trip already added. Would you like to add again?');
          if (!addToFavorites) {
            return; // User chose not to add the trip again
          }
        }
  
        // Add the current weather data to favorites
        existingFavorites.push({ id: weatherData.id, name: weatherData.name });
        // Store the updated favorites back to local storage
        localStorage.setItem('favorites', JSON.stringify(existingFavorites));
        console.log('Liked destination data stored in local storage');
      } else {
        console.error('No weather data to like.');
      }
    } catch (error) {
      console.error('Error storing liked destination data in local storage:', error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="bg-transparent w-full h-1 mb-4"
        style={{ border: "1px solid transparent" }}
      ></div>
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg mb-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Plan Trip
        </h1>
        <div className="flex justify-center items-center mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-l-md border-none focus:outline-none"
            placeholder="Enter location..."
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md focus:outline-none"
          >
            Search
          </button>
        </div>
        {weatherData && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {weatherData.name}
            </h2>
            <div className="text-6xl font-bold text-gray-800">
              {Math.round(convertToCelsius(weatherData.main.temp - 273.15))}°F
            </div>
            <div className="text-xl text-gray-700 mb-4">
              {weatherData.weather[0].description}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-lg text-gray-700">Feels like</p>
                <p className="text-2xl font-bold text-gray-800">
                  {Math.round(convertToCelsius(weatherData.main.feels_like - 273.15))}°F
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-700">Humidity</p>
                <p className="text-2xl font-bold text-gray-800">
                  {weatherData.main.humidity}%
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-700">Wind Speed</p>
                <p className="text-2xl font-bold text-gray-800">
                  {weatherData.wind.speed} m/s
                </p>
              </div>
            </div>
            {auth.loggedIn() ? (
              <button onClick={handleLike} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-4 focus:outline-none">
                Like
              </button>
            ) : ''}
          </div>
        )}
      </div>
      <Destination destinations={destinations} onCityClick={handleCityClick} />
    </div>
  );
}

export default Weather;


