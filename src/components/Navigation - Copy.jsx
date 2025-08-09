import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SuperNavBar from './SuperNavBar';

const Navigation = () => {
  const { user, logout } = useAppContext();
  const navItems = [
    { path: '/classify', label: '🤖 Classify', icon: '🤖' },
    { path: '/history', label: '📜 History', icon: '📜' },
    { path: '/schedule', label: '📅 Schedule', icon: '📅' },
    { path: '/credits', label: '🌱 Credits', icon: '🌱' },
    { path: '/status', label: '📋 Status', icon: '📋' }
  ];

  const getNavLinkStyle = ({ isActive }) => ({
    padding: '0.75rem 1.5rem',
    borderRadius: '25px',
    backgroundColor: isActive ? '#e8f5e8' : 'transparent',
    color: isActive ? '#2e7d32' : '#666',
    textDecoration: 'none',
    fontWeight: isActive ? '600' : '500',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    border: isActive ? '1px solid #c8e6c9' : '1px solid transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    minWidth: '110px',
    justifyContent: 'center'
  });

  return (
    <>
      {user && user.roles && user.roles.length > 1 && <SuperNavBar />}
      <nav style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
        padding: '1rem 0',
        position: 'sticky',
        top: '0',
        zIndex: 100,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#2e7d32',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1a4d1a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#2e7d32'}
          >
            <span>👤</span>
            <span>{user?.name || 'User'}</span>
            <span style={{ color: '#f44336', fontSize: '1.2rem', marginLeft: '0.5rem' }}>🚪</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                style={getNavLinkStyle}
              >
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                <span className="nav-text">{item.label.split(' ')[1] || item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
