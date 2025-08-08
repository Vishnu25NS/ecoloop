import React, { useState } from 'react';

// PickupScheduler Component
const PickupScheduler = ({ onSchedulePickup }) => {
  const [formData, setFormData] = useState({
    wasteType: '',
    pickupDate: '',
    pickupTime: '',
    pickupLocation: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wasteTypes = ['Organic', 'Plastic', 'Metal', 'Paper', 'E-waste'];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.wasteType) newErrors.wasteType = 'Waste type is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSchedulePickup && onSchedulePickup(formData);
      setFormData({ wasteType: '', pickupDate: '', pickupTime: '', pickupLocation: '' });
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.wasteType && formData.pickupDate && 
                     formData.pickupTime && formData.pickupLocation.trim();

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: '#2e7d32', 
            fontWeight: '600',
            fontSize: '1rem'
          }}>
            Waste Type *
          </label>
          <select
            value={formData.wasteType}
            onChange={(e) => handleInputChange('wasteType', e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem',
              border: errors.wasteType ? '2px solid #f44336' : '1px solid #c8e6c9',
              borderRadius: '8px',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            <option value="">Select waste type</option>
            {wasteTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.wasteType && (
            <span style={{ color: '#f44336', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
              {errors.wasteType}
            </span>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#2e7d32', 
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              Pickup Date *
            </label>
            <input
              type="date"
              value={formData.pickupDate}
              onChange={(e) => handleInputChange('pickupDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              style={{
                width: '100%',
                padding: '0.875rem',
                border: errors.pickupDate ? '2px solid #f44336' : '1px solid #c8e6c9',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            {errors.pickupDate && (
              <span style={{ color: '#f44336', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                {errors.pickupDate}
              </span>
            )}
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#2e7d32', 
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              Pickup Time *
            </label>
            <input
              type="time"
              value={formData.pickupTime}
              onChange={(e) => handleInputChange('pickupTime', e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem',
                border: errors.pickupTime ? '2px solid #f44336' : '1px solid #c8e6c9',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            {errors.pickupTime && (
              <span style={{ color: '#f44336', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                {errors.pickupTime}
              </span>
            )}
          </div>
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: '#2e7d32', 
            fontWeight: '600',
            fontSize: '1rem'
          }}>
            Pickup Location *
          </label>
          <input
            type="text"
            placeholder="Enter your complete address"
            value={formData.pickupLocation}
            onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem',
              border: errors.pickupLocation ? '2px solid #f44336' : '1px solid #c8e6c9',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
          {errors.pickupLocation && (
            <span style={{ color: '#f44336', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
              {errors.pickupLocation}
            </span>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: (isFormValid && !isSubmitting) ? '#4caf50' : '#e0e0e0',
            color: (isFormValid && !isSubmitting) ? 'white' : '#999',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: (isFormValid && !isSubmitting) ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease'
          }}
        >
          {isSubmitting ? '📅 Scheduling...' : '📅 Schedule Pickup'}
        </button>
      </div>
    </div>
  );
};

export default PickupScheduler;