import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from './axiosInstance';


function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    axiosInstance.get(`/articles/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setUserId(res.data.authorId || '1');
      })
      .catch(() => alert('Article not found'));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !userId) {
      alert('All fields are required.');
      return;
    }
    try {
      await axiosInstance.put(`/articles/${id}`, {
        title,
        content,
        userId,
      });
      navigate(`/articles/${id}`);
    } catch {
      alert('Failed to update article.');
    }
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      padding: '40px 80px',
      boxSizing: 'border-box',
      backgroundColor: '#f0f7ff',
      color: '#003366',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h2 style={{ marginBottom: 20 }}>Edit Article</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column' }}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ padding: 10, marginBottom: 20, fontSize: 16 }}
        />
        <label>Content:</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={8}
          style={{ padding: 10, marginBottom: 20, fontSize: 16, resize: 'vertical' }}
        />
        <label>User ID:</label>
        <input
          type="number"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          style={{ padding: 10, marginBottom: 30, fontSize: 16 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" style={{
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: 5,
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Save
          </button>
          <Link to={`/articles/${id}`} style={{
            padding: '12px 24px',
            backgroundColor: '#ccc',
            color: '#333',
            textDecoration: 'none',
            borderRadius: 5,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditArticle;
