import React, { useState } from 'react';

function API() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data from the API
  const fetchData = () => {
    setIsLoading(true);
    setError(null); // Reset error state on new API call
    fetch('https://api.example.com/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data); // Update state with fetched data
        setIsLoading(false); // Set loading to false after data is loaded
      })
      .catch(error => {
        setError(error.message); // Handle any errors
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h1>Welcome to My Page</h1>
      {/* Button to trigger the API call */}
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Data'}
      </button>
      {/* Display data or error message */}
      {error && <div>Error: {error}</div>}
      {data && (
        <div>
          <h2>Data from API</h2>
          {/* Render your data here. Example: */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default API;
