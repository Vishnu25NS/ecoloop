import React from 'react';
import { useAppContext } from '../context/AppContext';
import WastePhotoUpload from '../components/WastePhotoUpload';
import WasteClassificationResult from '../components/WasteClassificationResult';

// Upload Page
const UploadPage = () => {
  const { classification, setClassification, addCredits } = useAppContext();

  const showToast = (msg) => alert(msg);

  const handleImageUpload = (image) => {
    // Simulate AI classification
    const wasteTypes = ['Organic', 'Plastic', 'Metal', 'Paper', 'E-waste'];
    const randomType = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
    
    setTimeout(() => {
      setClassification(randomType);
      addCredits(25);
      showToast(`Photo uploaded successfully! Classified as ${randomType}`);
    }, 1500);
  };

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: '#2e7d32', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>
          📸 Upload Waste Photo
        </h1>
        <p style={{ color: '#666', fontSize: '1.2rem', margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Take or upload a photo of your waste for AI-powered classification
        </p>
      </div>
      
      <WastePhotoUpload onImageUpload={handleImageUpload} />
      
      {classification && (
        <div style={{ marginTop: '3rem' }}>
          <WasteClassificationResult classification={classification} />
        </div>
      )}
    </div>
  );
};
export default UploadPage;