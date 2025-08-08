import React from 'react';

// PickupStatusList Component
const PickupStatusList = ({ pickups = [] }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Pending': '#ff9800',
      'In Progress': '#2196f3',
      'Completed': '#4caf50',
      'Cancelled': '#f44336'
    };
    return colors[status] || '#666';
  };

  const getStatusBgColor = (status) => {
    const colors = {
      'Pending': '#fff3c4',
      'In Progress': '#e3f2fd',
      'Completed': '#c8e6c9',
      'Cancelled': '#ffcdd2'
    };
    return colors[status] || '#f5f5f5';
  };

  const getWasteIcon = (type) => {
    const icons = {
      'Organic': '🌿',
      'Plastic': '♻️',
      'Metal': '🔧',
      'Paper': '📄',
      'E-waste': '💻'
    };
    return icons[type] || '🗑️';
  };

  if (pickups.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          color: '#666',
          backgroundColor: '#f8f9fa',
          borderRadius: '16px',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
          <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>No Pickups Scheduled</h3>
          <p style={{ margin: 0, fontSize: '1rem' }}>
            Schedule your first pickup to start making a difference!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
      }}>
        {pickups.map((pickup, index) => (
          <div
            key={index}
            style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>
                  {getWasteIcon(pickup.wasteType)}
                </span>
                <div>
                  <div style={{
                    color: '#2e7d32',
                    fontWeight: '600',
                    fontSize: '1.1rem'
                  }}>
                    {pickup.wasteType}
                  </div>
                  <div style={{ color: '#666', fontSize: '0.875rem' }}>
                    ID: #{pickup.id || `WM${index.toString().padStart(3, '0')}`}
                  </div>
                </div>
              </div>
              
              <div style={{
                padding: '0.5rem 1rem',
                backgroundColor: getStatusBgColor(pickup.status),
                color: getStatusColor(pickup.status),
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {pickup.status}
              </div>
            </div>
            
            {/* Details */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  <span>📅</span>
                  <span>{pickup.date || pickup.pickupDate}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  <span>🕒</span>
                  <span>{pickup.time || pickup.pickupTime}</span>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                color: '#666',
                fontSize: '0.9rem'
              }}>
                <span style={{ marginTop: '0.1rem' }}>📍</span>
                <span style={{ lineHeight: '1.4' }}>{pickup.location || pickup.pickupLocation}</span>
              </div>
            </div>
            
            {/* Progress Indicator */}
            {pickup.status !== 'Cancelled' && (
              <div style={{ marginTop: '1rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  color: '#666',
                  marginBottom: '0.5rem'
                }}>
                  <span>Progress</span>
                  <span>
                    {pickup.status === 'Completed' ? '100%' : 
                     pickup.status === 'In Progress' ? '50%' : '25%'}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '4px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: pickup.status === 'Completed' ? '100%' : 
                           pickup.status === 'In Progress' ? '50%' : '25%',
                    height: '100%',
                    backgroundColor: getStatusColor(pickup.status),
                    borderRadius: '2px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickupStatusList;
