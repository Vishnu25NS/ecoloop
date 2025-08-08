import React, { useState } from 'react';

// WastePhotoUpload Component
const WastePhotoUpload = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (selectedImage && onImageUpload) {
      setIsUploading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload
      onImageUpload(selectedImage);
      setIsUploading(false);
      setSelectedImage(null);
      document.querySelector('input[type="file"]').value = '';
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div style={{
        border: '2px dashed #81c784',
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#f1f8e9',
        marginBottom: '1rem',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {selectedImage ? (
          <img 
            src={selectedImage} 
            alt="Waste preview" 
            style={{
              maxWidth: '100%',
              maxHeight: '200px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          />
        ) : (
          <div>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📷</div>
            <p style={{ color: '#4a6741', margin: 0, fontSize: '1.1rem' }}>
              Select an image of your waste to classify
            </p>
          </div>
        )}
      </div>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '1px solid #c8e6c9',
          borderRadius: '8px',
          marginBottom: '1rem',
          fontSize: '1rem'
        }}
      />
      
      <button
        onClick={handleSubmit}
        disabled={!selectedImage || isUploading}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: (selectedImage && !isUploading) ? '#4caf50' : '#e0e0e0',
          color: (selectedImage && !isUploading) ? 'white' : '#999',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: (selectedImage && !isUploading) ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease'
        }}
      >
        {isUploading ? '📤 Uploading...' : '📷 Upload Photo'}
      </button>
    </div>
  );
};

export default WastePhotoUpload;