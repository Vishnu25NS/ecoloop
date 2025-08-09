import React from 'react';
import { useAppContext } from '../context/AppContext';

const SuperNavBar = () => {
  const { user, mode, switchMode } = useAppContext();

  const handleModeChange = () => {
    const userRoles = user?.roles || [];
    if (userRoles.includes('user') && userRoles.includes('collector')) {
      const newMode = mode === 'user' ? 'collector' : 'user';
      switchMode(newMode);
    }
  };

  if (!user || !user.roles || user.roles.length < 2) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: '#1a4d1a',
      color: 'white',
      padding: '0.75rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '2px solid #2e7d32'
    }}>
      <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>
        🌱 Welcome, {user?.name || 'User'}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Switch View:</span>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }}>
          <span>User</span>
          <div style={{
            width: '40px',
            height: '22px',
            backgroundColor: mode === 'collector' ? '#4caf50' : '#ccc',
            borderRadius: '11px',
            position: 'relative',
            transition: 'background-color 0.3s'
          }} onClick={handleModeChange}>
            <div style={{
              width: '18px',
              height: '18px',
              backgroundColor: 'white',
              borderRadius: '50%',
              position: 'absolute',
              top: '2px',
              left: mode === 'collector' ? '20px' : '2px',
              transition: 'left 0.3s'
            }}></div>
          </div>
          <span>Collector</span>
        </label>
      </div>
    </div>
  );
};

export default SuperNavBar;
