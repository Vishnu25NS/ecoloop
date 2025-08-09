import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from './context/AppContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to log in. Please check your email and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#2e7d32', marginBottom: '1.5rem' }}>Login to EcoLoop</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2e7d32', fontWeight: '600' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #c8e6c9', borderRadius: '8px', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2e7d32', fontWeight: '600' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #c8e6c9', borderRadius: '8px', fontSize: '1rem' }}
          />
        </div>
        {error && (
          <div style={{ color: '#f44336', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '1rem', backgroundColor: isSubmitting ? '#e0e0e0' : '#4caf50', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'background-color 0.3s'
          }}
        >
          {isSubmitting ? 'Logging In...' : 'Login'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#666' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#2e7d32', textDecoration: 'none', fontWeight: '600' }}>Sign up here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
