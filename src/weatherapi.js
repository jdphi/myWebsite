import React, { useState } from 'react';

function WeatherAPI() {
    const [zipCode, setZipCode] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [locationData, setLocationData] = useState(null); // Added state to store the API response
    const apiKey = 'cb29820de7b59e635ce8d6ac71321011'
    
    //const apiKey = 'b21c83fb0e35b969b377f998ad8a46ea';

    //function to fetch data from the api
    const fetchZipData = async () => {
        if (!zipCode.trim() || !countryCode.trim()){
            alert('Please enter both a Zip code and a country code');
            return;
        }
        try {
            const url = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${apiKey}`
            const response = await fetch(url);
            const data = await response.json();
            setLocationData(data); // Store the API response in state
        } catch (err) {
            console.error("Failed to fetch zip code:", err);
            alert('Failed to fetch zip code' + err.message);
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
                placeholder="Country Code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
            />
            <button onClick={fetchZipData}>Look Up Weather</button>
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
        </div>
    )
}

export default WeatherAPI;
