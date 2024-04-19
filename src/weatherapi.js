import React, { useState } from 'react';

function WeatherAPI() {
    const [zipCode, setZipCode] = useState('');
    //const [countryCode, setCountryCode] = useState('');
    const [locationData, setLocationData] = useState(null); // Added state to store the API response
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = 'cb29820de7b59e635ce8d6ac71321011'
    
    //const apiKey = 'b21c83fb0e35b969b377f998ad8a46ea';

    //function to fetch data from the api
    const fetchZipData = async () => {
        if (!zipCode.trim()){
            alert('Please enter both a Zip code and a country code');
            return;
        }
        try {
            const url = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`
            const response = await fetch(url);
            const data = await response.json();
            setLocationData(data); // Store the API response in state
        } catch (err) {
            console.error("Failed to fetch zip code:", err);
            alert('Failed to fetch zip code' + err.message);
        }
    };

    const fetchWeatherData = async () => {

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apiKey}&units=imperial`;
            const response = await fetch(url);
            const data = await response.json();
            setWeatherData(data);
            console.log(data)
        } catch (err) {
            console.error("failed to fetch weather data", err);
            alert('failed to fetch weather data' + err.message);
        }
    };

    return (
        <div>
            <input 
                type="text"
                placeholder="ZIP Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
            />
            
            <button onClick={fetchZipData}>Look Up Location</button>
         {/* Display the fetched data */}
         {locationData && (
                <div>
                    <p>Latitude: {locationData.lat}</p>
                    <p>Longitude: {locationData.lon}</p>
                    <p>Zip Code: {locationData.zip}</p>
                    <p>City Name: {locationData.name}</p>
                    <p>Country: {locationData.country}</p>
                </div>
            )}
            <button onClick={fetchWeatherData}>fetch weather data</button>
            
            {weatherData && ( //
                <div>
                    <p>Main Weather:{JSON.stringify(weatherData)}</p>
                    <p>Cloud cover percentage: {weatherData.clouds?.all}%</p>
                    <p>Temperature:{weatherData.main.temp} degrees fahrenheit</p>
                    
                    <p>Feels like: {weatherData.main.feels_like}</p>
                    <p>Visibility: {weatherData.visibility} meters</p>
                    <p>Humidity: {weatherData.main.humidity}</p>
                </div>    
            )}
        </div>
    )
}

export default WeatherAPI;
