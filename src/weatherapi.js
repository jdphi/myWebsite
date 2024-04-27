import React, { useState } from 'react';

function WeatherAPI() {
    const [zipCode, setZipCode] = useState('');
    const [countryCode, setCountryCode] = useState('US');
    const [locationData, setLocationData] = useState(null); // Added state to store the API response
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = 'cb29820de7b59e635ce8d6ac71321011';

    const handleFetchWeather = async () => {
        if (!zipCode.trim() && !countryCode.trim()){
            alert('Please enter both a Zip code and a country code');
            return;
        }
        try {
            const zipUrl = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${apiKey}`;
            const zipResponse = await fetch(zipUrl);
            const zipData = await zipResponse.json();

            if (zipData.lat && zipData.lon) { // Ensure latitude and longitude are available
                setLocationData(zipData); // Update state if needed for rendering or other operations
                console.log(zipData);

                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${zipData.lat}&lon=${zipData.lon}&appid=${apiKey}&units=imperial`;
                const weatherResponse = await fetch(weatherUrl);
                const weatherData = await weatherResponse.json();
                setWeatherData(weatherData); // Set the weather data state
                console.log(weatherData);
            } else {
                alert('Latitude and Longitude not found in location data');
            }
        } catch (err) {
            console.error("Failed to fetch data:", err);
            alert('Failed to fetch data: ' + err.message);
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
            <button onClick={handleFetchWeather}>One Button to Get Weather</button>
            {weatherData && (
                <div>
                    <p>Your latitude and longitude are: {locationData?.lat},{locationData?.lon}</p>
                    {/*<p>Main Weather:{JSON.stringify(weatherData)}</p>*/}
                    <p>Cloud cover percentage: {weatherData.clouds?.all}%</p>
                    <p>Temperature:{weatherData.main.temp} degrees Fahrenheit</p>
                    <p>Feels like: {weatherData.main.feels_like}</p>
                    <p>Visibility: {weatherData.visibility} meters</p>
                    <p>Humidity: {weatherData.main.humidity}</p>
                </div>    
            )}
        </div>
    );
}

export default WeatherAPI;
// documentation https://openweathermap.org/current