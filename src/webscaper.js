import React, { useState } from 'react';

function WebScraper() {
    const [data, setData] = useState('');
    const [url, setUrl] = useState('https://example.com');

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/scrape?url=${encodeURIComponent(url)}`);
            const jsonData = await response.json();
            setData(jsonData.text);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };
    

    return (
        <div>
            <input value={url} onChange={e => setUrl(e.target.value)} />
            <button onClick={fetchData}>Scrape Website</button>
            <p>{data}</p>
        </div>
    );
}

export default WebScraper;
