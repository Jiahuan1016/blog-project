import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/articles/${id}`)
      .then(res => setArticle(res.data))
      .catch(() => setError('Article not found'));
  }, [id]);

  
  useEffect(() => {
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(`/comment/article/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error('loading error', err);
    }
  };

 
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this article?');
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/articles/${id}`);
      navigate('/');
    } catch {
      alert('Failed to delete article.');
    }
  };

  
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      
      await axiosInstance.post('/comment/add', null, {
        params: {
          articleId: id,
          content: content,
        },
      });
      setContent('');
      fetchComments();
    } catch (err) {
      alert('Comment failed.');
      console.error(err);
    }
  };

  if (error) return <h2 style={{ textAlign: 'center', marginTop: 40 }}>{error}</h2>;
  if (!article) return <h2 style={{ textAlign: 'center', marginTop: 40 }}>Loading...</h2>;

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      padding: '40px 0',
      backgroundColor: '#e6f0ff',
      color: '#003366',
      overflowY: 'auto',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '900px',
        padding: '0 40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
        <h1 style={{ marginBottom: 40 }}>{article.title}</h1>
        <p style={{
          maxWidth: 900,
          lineHeight: 1.6,
          fontSize: 18,
          marginBottom: 40,
          whiteSpace: 'pre-wrap'
        }}>
          {article.content}
        </p>

        
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '20px',
          width: '100%',
          maxWidth: 900,
          marginBottom: 40
        }}>
          <button
            onClick={() => navigate(`/edit/${id}`)}
            style={{
              backgroundColor: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              padding: '10px 24px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            style={{
              backgroundColor: '#cc0000',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              padding: '10px 24px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Delete
          </button>
          <Link to="/" style={{
            padding: '10px 24px',
            backgroundColor: '#ccc',
            color: '#333',
            textDecoration: 'none',
            borderRadius: 5,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            &lt; Back to Articles
          </Link>
        </div>

        
      
        <div style={{
          width: '100%',
          maxWidth: 900,
          marginTop: 20,
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: 8,
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: 20 }}>Comments</h3>

          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} style={{
                borderBottom: '1px solid #ddd',
                padding: '10px 0'
              }}>
                <p style={{ margin: 0 }}>{c.content}</p>
                <span style={{ fontSize: 12, color: '#666' }}>
                  {c.username || 'unknown user'} | {new Date(c.create_time).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p style={{ color: '#666' }}>No comments yet~</p>
          )}

          
          <form onSubmit={handleSubmitComment} style={{
            marginTop: 20,
            display: 'flex',
            gap: 10
          }}>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment..."
              style={{
                flex: 1,
                border: '1px solid #ccc',
                borderRadius: 5,
                padding: '10px'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#0066cc',
                color: 'white',
                border: 'none',
                borderRadius: 5,
                padding: '10px 16px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;