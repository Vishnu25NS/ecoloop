import React from 'react';
import { useAppContext } from '../context/AppContext';
import GreenCreditsTracker from '../components/GreenCreditsTracker';

// Credits Page
const CreditsPage = () => {
  const { credits, pickups } = useAppContext();
  const level = Math.floor(credits / 500) + 1;

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: '#2e7d32', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>
          🌱 Green Credits
        </h1>
        <p style={{ color: '#666', fontSize: '1.2rem', margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Track your environmental impact and earn rewards for sustainable actions
        </p>
      </div>
      
      <GreenCreditsTracker 
        credits={credits}
        level={level}
        totalCredits={credits}
      />
      
      {/* Recent Activities */}
      <div style={{ maxWidth: '600px', margin: '3rem auto 0' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem', textAlign: 'center' }}>
          Recent Activities
        </h3>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e0e0e0',
          overflow: 'hidden'
        }}>
          {pickups.slice(0, 3).map((pickup, index) => (
            <div key={index} style={{
              padding: '1rem',
              borderBottom: index < 2 ? '1px solid #f0f0f0' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#e8f5e8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}>
                  🚛
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#2e7d32' }}>
                    {pickup.wasteType} Pickup
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    {pickup.date} at {pickup.time}
                  </div>
                </div>
              </div>
              <div style={{
                color: '#4caf50',
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                +50 Credits
              </div>
            </div>
          ))}
          {pickups.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              No recent activities
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;
