import React, { useState, useEffect } from 'react';

function NewsAPI() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const apiKey = '56e41e2dd3624570960849c99a6ed5df'; // Replace with your actual API key
        const url = `https://newsapi.org/v2/everything?q=technology&apiKey=${apiKey}`;

        const fetchArticles = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setArticles(data.articles);
                if (data.articles.length > 0) {
                    console.log("First article's source ID:", data.articles[0].source.id); // Accessing the id
                }
            } catch (err) {
                console.error('Failed to fetch articles:', err);
            }
        };

        fetchArticles();
    }, []); // Dependency array is empty, so this effect runs once on mount

    return (
        <div>
            <h1>News Feed</h1>
            {articles.map((article, index) => (
                <div key={index}>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    <div>{article.content}</div>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">{article.url}</a>
                    <img src={article.urlToImage} alt={article.title}/>
                </div>
            ))}
        </div>
    );
}

export default NewsAPI;