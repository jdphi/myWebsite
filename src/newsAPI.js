import React, { useState, useEffect } from 'react';

function NewsAPI() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
        const query = 'technology'; // Example query
        const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

        const fetchArticles = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setArticles(data.articles);
            } catch (err) {
                console.error('Failed to fetch articles:', err);
            }
        };

        fetchArticles();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <h1>News Feed</h1>
            {articles.map((article, index) => (
                <div key={index}>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    <div>{article.content}</div>
                </div>
            ))}
        </div>
    );
}

export default NewsAPI;
