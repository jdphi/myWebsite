import React, { useState } from 'react';

function WeatherAPI() {
    const [zipCode, setZipCode] = useState('');
    const [countryCode, setCountryCode] = useState('US');
    const [locationData, setLocationData] = useState(null); // Added state to store the API response
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = 'cb29820de7b59e635ce8d6ac71321011'

    const handleFetchWeather = async () => {
        if (!zipCode.trim() && !countryCode.trim()){
            alert('Please enter both a Zip code and a country code');
            return;
        }
        try {
            const zipUrl = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${apiKey}`
            const zipResponse = await fetch(zipUrl);
            const zipData = await zipResponse.json();
            setLocationData(zipData);
            console.log(zipData)
        } catch (err) {
            console.error("Failed to fetch zip code:", err);
            alert('Failed to fetch zip code' + err.message);
        }
        try {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apiKey}&units=imperial`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();
            setWeatherData(weatherData);
            console.log(weatherData);
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
            <input
                type="text"
                placeholder="Country Code (US by default)"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
            />
            
         {/* Display the fetched data */}
         <button onClick={handleFetchWeather}>OneButtontogetweather</button>
            {weatherData && ( //
                <div>
                    <p>{JSON.stringify(locationData)}</p>
                    <p>{locationData.lat},{locationData.lon}</p>
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