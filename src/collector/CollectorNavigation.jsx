import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const CollectorNavigation = ({ user }) => {
  const { logout } = useAppContext();
  const collectorNavItems = [
    { path: '/collector/dashboard', label: 'Dashboard', icon: '📋' },
    { path: '/collector/pickups', label: 'Pickups', icon: '🚛' },
    { path: '/collector/map', label: 'Route Map', icon: '🗺️' },
    { path: '/collector/schedule', label: 'Schedule', icon: '📅' }
  ];

  const getNavLinkStyle = ({ isActive }) => ({
    padding: '0.75rem 1.25rem',
    borderRadius: '6px',
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    backgroundColor: isActive ? '#2e7d32' : 'rgba(255, 255, 255, 0.1)',
    border: isActive ? '1px solid #4caf50' : '1px solid transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    minWidth: '110px',
    justifyContent: 'center',
    textDecoration: 'none'
  });

  if (!user || user.roles?.length === 0) {
    return null;
  }

  return (
    <nav style={{
      backgroundColor: '#1a4d1a',
      padding: '1rem 0',
      borderBottom: '2px solid #2e7d32'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          color: 'white',
          fontWeight: '600',
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span>🚛</span>
          <span>Collector Portal</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          {collectorNavItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              style={getNavLinkStyle}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          color: 'white'
        }}>
          <div style={{
            color: 'white',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>👤</span>
            <span>{user?.name || 'Collector'}</span>
          </div>
          <button
            onClick={logout}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default CollectorNavigation;
