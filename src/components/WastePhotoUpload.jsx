import React, { useState } from 'react';

// WastePhotoUpload Component
const WastePhotoUpload = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (selectedFile && onImageUpload) {
      setIsUploading(true);
      await onImageUpload(selectedFile);
      setIsUploading(false);
      setSelectedFile(null);
      setImagePreview(null);
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
        {imagePreview ? (
          <img 
            src={imagePreview} 
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
        disabled={!selectedFile || isUploading}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: (selectedFile && !isUploading) ? '#4caf50' : '#e0e0e0',
          color: (selectedFile && !isUploading) ? 'white' : '#999',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: (selectedFile && !isUploading) ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease'
        }}
      >
        {isUploading ? '📤 Uploading...' : '📷 Upload Photo'}
      </button>
    </div>
  );
};

export default WastePhotoUpload;
