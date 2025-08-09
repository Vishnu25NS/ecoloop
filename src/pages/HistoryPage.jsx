import React from 'react';
import { useAppContext } from '../context/AppContext';

const HistoryPage = () => {
  const { classificationHistory } = useAppContext();

  const getWasteIcon = (type) => ({ 'Organic': '🌿', 'Plastic': '♻️', 'Metal': '🔧', 'Paper': '📄', 'E-waste': '💻' }[type] || '🗑️');
  const getWasteColor = (type) => ({ 'Organic': '#4caf50', 'Plastic': '#2196f3', 'Metal': '#9e9e9e', 'Paper': '#ff9800', 'E-waste': '#9c27b0' }[type] || '#4caf50');

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: '#2e7d32', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>
          📜 Classification History
        </h1>
        <p style={{ color: '#666', fontSize: '1.2rem', margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          A record of all the waste you've classified with EcoLoop.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
        {classificationHistory.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧐</div>
            <h3 style={{ color: '#2e7d32' }}>No History Yet</h3>
            <p style={{ color: '#666' }}>Classify your first item to see your history here!</p>
          </div>
        ) : (
          classificationHistory.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
            }}>
              <img src={item.imagePreview} alt={item.classification} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, color: getWasteColor(item.classification), fontSize: '1.4rem' }}>
                    {getWasteIcon(item.classification)} {item.classification}
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: '#999' }}>
                    {item.timestamp?.seconds ? new Date(item.timestamp.seconds * 1000).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                  <strong>Disposal Tip:</strong> {item.disposalTip}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
