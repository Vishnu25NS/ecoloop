import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from './context/AppContext';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [roles, setRoles] = useState(['user']);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAppContext();
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setRoles(prevRoles => {
      if (prevRoles.includes(role)) {
        return prevRoles.filter(r => r !== role);
      } else {
        return [...prevRoles, role];
      }
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (roles.length === 0) {
      setError('Please select at least one role.');
      return;
    }
    setIsSubmitting(true);
    try {
      await signup(email, password, name, mobile, location, roles);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#2e7d32', marginBottom: '1.5rem' }}>Create an EcoLoop Account</h2>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2e7d32', fontWeight: '600' }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #c8e6c9', borderRadius: '8px', fontSize: '1rem' }}
          />
        </div>
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
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2e7d32', fontWeight: '600' }}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #c8e6c9', borderRadius: '8px', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2e7d32', fontWeight: '600' }}>Mobile Number</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #c8e6c9', borderRadius: '8px', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2e7d32', fontWeight: '600' }}>Location / Address</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #c8e6c9', borderRadius: '8px', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2e7d32', fontWeight: '600' }}>User Roles</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['user', 'collector'].map(role => (
              <label key={role} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={roles.includes(role)}
                  onChange={() => handleRoleChange(role)}
                />
                <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
              </label>
            ))}
          </div>
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
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#666' }}>
        Already have an account? <Link to="/login" style={{ color: '#2e7d32', textDecoration: 'none', fontWeight: '600' }}>Login here</Link>
      </p>
    </div>
  );
};

export default SignupPage;
