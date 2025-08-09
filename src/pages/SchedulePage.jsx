import React from 'react';
import { useAppContext } from '../context/AppContext';
import PickupScheduler from '../components/PickupScheduler';
// import { useToast } from '../hooks/useToast'; // If you have this file

// Schedule Page
const SchedulePage = () => {
  // const { showToast } = useToast();
  const { addPickup, addCredits } = useAppContext();

  const showToast = (msg) => alert(msg);

  const handleSchedulePickup = (pickupData) => {
    const newPickup = {
      ...pickupData,
      id: Date.now(),
      status: 'Pending',
      date: pickupData.pickupDate,
      time: pickupData.pickupTime,
      location: pickupData.pickupLocation
    };
    
    addPickup(newPickup);
    addCredits(50);
    showToast('Pickup scheduled successfully! We\'ll contact you soon.', 'success');
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
