import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { path: '/upload', label: '📸 Upload', icon: '📸' },
    { path: '/schedule', label: '📅 Schedule', icon: '📅' },
    { path: '/classification', label: '🔍 Classify', icon: '🔍' },
    { path: '/credits', label: '🌱 Credits', icon: '🌱' },
    { path: '/status', label: '📋 Status', icon: '📋' }
  ];

  const currentPath = window.location.pathname || '/upload';

  return (
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
        justifyContent: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        {navItems.map(item => {
          const isActive = currentPath === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={{
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
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              <span className="nav-text">{item.label.split(' ')[1] || item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
