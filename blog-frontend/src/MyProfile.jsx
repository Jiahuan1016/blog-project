import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { Link } from 'react-router-dom';

function MyProfile() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setEmail(parsed.email || ''); 
    }
  }, []);

  const handleSaveEmail = async () => {
    if (!email) return alert('Email cannot be empty.');
    try {
      await axiosInstance.put(`/users/${user.id}/email`, { email });
      alert('Email saved!');
      const updatedUser = { ...user, email };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      alert('Failed to save email.');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#f0f4f8',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 500,
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 10,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        color: '#003366',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>My Profile</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>User ID:</strong> {user.id}</p>
        <div style={{ marginTop: 20 }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
          />
          <button
            onClick={handleSaveEmail}
            style={{ marginTop: 10, padding: 10, width: '100%', backgroundColor: '#007acc', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}
          >
            Save Email
          </button>
         </div>
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <Link to="/" style={{ color: '#004080', textDecoration: 'underline' }}>
            &lt; Back to Articles
          </Link>
      </div>
    </div>
</div> 
  ); 
}
export default MyProfile;
