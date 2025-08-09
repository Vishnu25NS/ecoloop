import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import PickupScheduler from '../components/PickupScheduler';

const SchedulePage = () => {
  const { addPickup, addCredits } = useAppContext();
  const [showNotification, setShowNotification] = useState({ visible: false, message: '', type: 'success' });

  const handleSchedulePickup = async (pickupData) => {
    try {
      await addPickup({
        wasteType: pickupData.wasteType,
        pickupDate: pickupData.pickupDate,
        pickupTime: pickupData.pickupTime,
        pickupLocation: pickupData.pickupLocation,
        status: 'Pending',
        timestamp: new Date().toISOString()
      });
      setShowNotification({ visible: true, message: 'Pickup scheduled successfully! We\'ll contact you soon.', type: 'success' });
    } catch (error) {
      console.error("Failed to schedule pickup:", error);
      setShowNotification({ visible: true, message: 'Failed to schedule pickup. Please try again.', type: 'error' });
    }
  };

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: '#2e7d32', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>
          📅 Schedule Pickup
        </h1>
        <p style={{ color: '#666', fontSize: '1.2rem', margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Schedule a convenient time for waste collection from your location
        </p>
      </div>
      
      <PickupScheduler onSchedulePickup={handleSchedulePickup} />
    </div>
  );
};

export default SchedulePage;