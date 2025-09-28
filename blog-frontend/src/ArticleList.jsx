import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import { Link } from 'react-router-dom';

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axiosInstance.get('/articles')
      .then(res => setArticles(res.data))
      .catch(() => {});
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',    
        width: '100vw',       
        backgroundColor: '#e6f0fa',  
        color: '#003366',            
        padding: 20,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',        
      }}
    >
      <div style={{
        position: 'absolute',
        top: 65,
        right: 18,
      }}>
        <Link to="/profile">
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}>
            Home
          </button>
        </Link>
      </div>
      
      <h1 style={{ color: '#0059b3', marginBottom: 0 }}>Article List</h1>

      <div style={{
       position: 'absolute',
       top: 65,
       right: 125,     
      }}>
      <Link to="/create">
      <button
      style={{
        padding: '8px 16px',
        backgroundColor: '#007acc',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: 16,
      }}
    >
      Create New Article
    </button>
  </Link>
</div>


      <ul style={{
        listStyle: 'none',
        padding: 0,
        width: '100%',
        maxWidth: 600,          
      }}>
        {articles.map(article => (
          <li key={article.id} style={{ marginBottom: 10 }}>
            <Link
              to={`/articles/${article.id}`}
              style={{
                color: '#004080',
                fontWeight: 'bold',
                fontSize: 18,
                textDecoration: 'none',
                display: 'block',
                padding: '8px 12px',
                borderRadius: 4,
                backgroundColor: '#d9e6f9',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b0c4f2'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d9e6f9'}
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default ArticleList;
