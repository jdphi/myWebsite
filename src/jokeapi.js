import React, { useState } from 'react';

function JokeAPI() {
    const [joke, setJoke] = useState('');

    const fetchData = async () => {
        try {
            // Specify the category of the joke
            const url = "https://v2.jokeapi.dev/joke/Any";
            const response = await fetch(url);
            const data = await response.json();

            // Check if the joke setup and delivery are available (for two-part jokes)
            if (data.type === "twopart") {
                setJoke(`${data.setup} ... ${data.delivery}`);
            } else if (data.type === "single") { // For a single-part joke
                setJoke(data.joke);
            } else {
                throw new Error("No joke found");
            }
        } catch (err) {
            console.error('Failed to fetch joke:', err);
            alert('Failed to fetch joke: ' + err.message);
        }
    };

    return (
        <div className="home-container">
            <div className="home-intro">
                <h1>Welcome to the joke api page</h1>
            </div>
            <div className="joke-container">
                {/* Display the fetched joke */}
                <p>{joke}</p>
            </div>
            <div className="button-container">
                {/* Button to trigger the API call */}
                <button id="load_joke" onClick={fetchData}>Load Joke</button>
            </div>
        </div>
    );
}

export default JokeAPI;
