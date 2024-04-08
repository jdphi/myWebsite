import React, { useState } from 'react';

function Home() {
    // state to store the api data
    const [catImage, setCatImage] = useState(null);

    //function to fetch data from the api
    const fetchData = async () => {
        try {
            const url = "https://api.thecatapi.com/v1/images/search"
            const response = await fetch(url);
            const data = await response.json();
            if (data.length > 0) {
                setCatImage(data[0].url);
            } else {
                alert('No cat images were found.')
            }
            
        } catch (err) {
            alert('Failed to fetch cat image: ' + err.message);
        }
    };

    return (
        <div className="home-container">
            <div className="home-intro">
                <h1>Welcome to the Home Page</h1>
                <p>This is the home page of our React application. You can add more content here.</p>
            </div>
            <div className="image-container">
                {/*display the fetched image*/}
                {catImage && <img src={catImage} alt="cat picture" id="card" />}
            </div>
            <div className="button-container">
                {/*button to trigger the api call*/}
                <button id="load_more" onClick={fetchData}>Load Cat Image</button>
            </div>
        </div>
    );
}

export default Home;
