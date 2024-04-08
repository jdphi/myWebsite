import React, { useState } from 'react';

function WeatherAPI() {
    const [zipCode, setZipCode] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const apiKey = 'bcb29820de7b59e635ce8d6ac71321011';

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
        </div>
    )
}

export default WeatherAPI;
