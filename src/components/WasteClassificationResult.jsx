import React, { useState, useEffect } from 'react';

// WasteClassificationResult Component
const WasteClassificationResult = ({ classification, confidence = 95 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (classification) {
      setVisible(true);
    }
  }, [classification]);

  if (!classification) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem', 
        color: '#666',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>No Classification Yet</h3>
        <p>Upload a photo to see the waste classification result.</p>
      </div>
    );
  }

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

  const getWasteColor = (type) => {
    const colors = {
      'Organic': '#4caf50',
      'Plastic': '#2196f3',
      'Metal': '#9e9e9e',
      'Paper': '#ff9800',
      'E-waste': '#9c27b0'
    };
    return colors[type] || '#4caf50';
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.5s ease'
    }}>
      <div style={{
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '16px',
        border: `2px solid ${getWasteColor(classification)}`,
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          fontSize: '4rem', 
          marginBottom: '1rem',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        }}>
          {getWasteIcon(classification)}
        </div>
        
        <h2 style={{ 
          color: getWasteColor(classification), 
          margin: '0 0 0.5rem 0', 
          fontSize: '1.8rem',
          fontWeight: '700'
        }}>
          {classification}
        </h2>
        
        <div style={{
          backgroundColor: getWasteColor(classification),
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          display: 'inline-block',
          marginBottom: '1rem',
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>
          {confidence}% Confidence
        </div>
        
        <p style={{ 
          color: '#666', 
          margin: 0, 
          fontSize: '1rem',
          lineHeight: '1.5'
        }}>
          Classification complete! This waste type will help us process it properly and award you appropriate green credits.
        </p>
      </div>
    </div>
  );
};

export default WasteClassificationResult;