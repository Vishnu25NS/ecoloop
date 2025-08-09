import React from 'react';
import { useAppContext } from '../context/AppContext';
import PickupStatusList from '../components/PickupStatusList';

const StatusPage = () => {
  const { userPickups } = useAppContext();
  const pickups = Array.isArray(userPickups) ? userPickups : [];

  const statusCounts = pickups.reduce((acc, pickup) => {
    acc[pickup.status] = (acc[pickup.status] || 0) + 1;
    return acc;
  }, {});

  const getStatusColor = (status) => ({ 'Pending': '#ff9800', 'In Progress': '#2196f3', 'Completed': '#4caf50', 'Cancelled': '#f44336' }[status] || '#666');

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: '#2e7d32', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>
          📋 Pickup Status
        </h1>
        <p style={{ color: '#666', fontSize: '1.2rem', margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Track all your scheduled waste pickups and their current status
        </p>
      </div>
      
      {pickups.length > 0 && (
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto 3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem'
        }}>
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: getStatusColor(status),
                marginBottom: '0.5rem'
              }}>
                {count}
              </div>
              <div style={{ 
                color: '#666', 
                fontSize: '0.9rem', 
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {status}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <PickupStatusList pickups={userPickups} />
    </div>
  );
};

export default StatusPage;
