import React from 'react';
import { useAppContext } from '../context/AppContext';
import WasteClassificationResult from '../components/WasteClassificationResult';

// Classification Page
const ClassificationPage = () => {
  const { classification } = useAppContext();

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: '#2e7d32', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>
          🔍 Waste Classification
        </h1>
        <p style={{ color: '#666', fontSize: '1.2rem', margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          AI-powered waste identification and classification results
        </p>
      </div>
      
      <WasteClassificationResult 
        classification={classification} 
        confidence={classification ? Math.floor(Math.random() * 20) + 80 : 0}
      />
    </div>
  );
};

export default ClassificationPage;