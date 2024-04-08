import React, { useState } from 'react';

function DogAPI() {
    // state to store the api data
    const [dogImage, setDogImage] = useState(null);

    //function to fetch data from the api
    const fetchData = async () => {
        try {
            const url = "https://api.thedogapi.com/v1/images/search"
            const response = await fetch(url);
            const data = await response.json();
            if (data.length > 0) {
                setDogImage(data[0].url);
            } else {
                alert('No dog images were found.')
            }
            
        } catch (err) {
            alert('Failed to fetch dog image: ' + err.message);
        }
    };

    return (
        <div className="home-container">
            <div className="home-intro">
                <h1>Welcome to the dog api page</h1>
            </div>
            <div className="image-container">
                {/*display the fetched image*/}
                {dogImage && <img src={dogImage} alt="dog picture" id="card" />}
            </div>
            <div className="button-container">
                {/*button to trigger the api call*/}
                <button id="load_more" onClick={fetchData}>Load Dog Image</button>
            </div>
        </div>
    );
}

export default DogAPI;
