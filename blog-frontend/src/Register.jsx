import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/users/register',  {
        username,
        password,
      });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed. Username may already exist.');
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
        boxSizing: 'border-box',
        padding: '1rem',
      }}
    >
      <form
        onSubmit={handleRegister}
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
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontSize: '1.8rem',
            color: '#333',
            fontWeight: 'bold',
          }}
        >
          Register
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
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
          required
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
          Register
        </button>
        <p
          style={{
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '0.9rem',
            color: '#555',
          }}
        >
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{
              color: '#2563eb',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
