import React from 'react';

// GreenCreditsTracker Component
const GreenCreditsTracker = ({ credits, totalCredits, level = 1 }) => {
  const maxCredits = 1000;
  const percentage = Math.min((credits / maxCredits) * 100, 100);
  const nextLevelCredits = level * 500;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{
        padding: '2rem',
        backgroundColor: '#f1f8e9',
        borderRadius: '16px',
        border: '1px solid #c8e6c9',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h2 style={{ color: '#2e7d32', margin: 0, fontSize: '1.5rem' }}>
              🌱 Green Credits
            </h2>
            <p style={{ color: '#4a6741', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
              Level {level} Eco Warrior
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#2e7d32', fontWeight: '700', fontSize: '2rem' }}>
              {credits}
            </div>
            <div style={{ color: '#4a6741', fontSize: '0.875rem' }}>
              Total Credits
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <span style={{ color: '#2e7d32', fontWeight: '600', fontSize: '1rem' }}>
              Progress to Next Level
            </span>
            <span style={{ color: '#4a6741', fontSize: '0.875rem' }}>
              {Math.min(credits, nextLevelCredits)}/{nextLevelCredits}
            </span>
          </div>
          
          <div style={{
            width: '100%',
            height: '16px',
            backgroundColor: '#e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${Math.min((credits / nextLevelCredits) * 100, 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)',
              borderRadius: '8px',
              transition: 'width 0.8s ease'
            }} />
          </div>
        </div>
        
        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📸</div>
            <div style={{ color: '#2e7d32', fontWeight: '600' }}>Photos</div>
            <div style={{ color: '#666', fontSize: '0.875rem' }}>{Math.floor(credits / 25)}</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🚛</div>
            <div style={{ color: '#2e7d32', fontWeight: '600' }}>Pickups</div>
            <div style={{ color: '#666', fontSize: '0.875rem' }}>{Math.floor(credits / 50)}</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🏆</div>
            <div style={{ color: '#2e7d32', fontWeight: '600' }}>Level</div>
            <div style={{ color: '#666', fontSize: '0.875rem' }}>{level}</div>
          </div>
        </div>
        
        {/* Motivational Message */}
        <div style={{
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(76, 175, 80, 0.2)'
        }}>
          <p style={{
            color: '#2e7d32',
            margin: 0,
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            🌍 Amazing work! You're making a real difference for our planet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GreenCreditsTracker;