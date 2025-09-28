import React, { useState } from 'react';
import axiosInstance from './axiosInstance';
import { useNavigate, Link } from 'react-router-dom';

function CreateArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title || !content || !userId) {
      alert('All fields are required.');
      return;
    }
    try {
      await axiosInstance.post('/articles', { title, content, userId });
      navigate('/');
    } catch {
      alert('Failed to create article.');
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#e6f0fa', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 600,
          backgroundColor: 'white',
          padding: 30,
          borderRadius: 10,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          color: '#003366',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 25 }}>Create a New Article</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 15 }}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: 10,
                fontSize: 16,
                borderRadius: 5,
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ marginBottom: 15 }}>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              style={{
                width: '100%',
                padding: 10,
                fontSize: 16,
                borderRadius: 5,
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ marginBottom: 15 }}>
            <label>User ID:</label>
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={{
                width: '100%',
                padding: 10,
                fontSize: 16,
                borderRadius: 5,
                border: '1px solid #ccc',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: 16,
              fontWeight: 'bold',
              border: 'none',
              borderRadius: 5,
              backgroundColor: '#007acc',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </form>
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <Link to="/" style={{ color: '#004080', textDecoration: 'underline' }}>
            &lt; Back to Articles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateArticle;
