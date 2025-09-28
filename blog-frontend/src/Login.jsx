
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/users/login', { username, password });
      console.log('res.data =', res.data);
      const { token, username: username2, id, email } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ username2, id, email }));
      navigate('/');
    } catch (err) {
      alert('Login failed: invalid username or password');
    }
  };

  return (
  <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          width: '320px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.8rem', color: '#333' }}>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            marginBottom: '1rem',
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: '1.5rem',
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px',
            fontSize: '1rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#2563eb',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Log In
        </button>

        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#555' }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );

}



export default Login;
