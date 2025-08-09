import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import NotificationToast from './NotificationToast';

const CollectorSchedulePage = () => {
  const { availablePickups, scheduleNewPickup, db } = useAppContext();
  const [showToast, setShowToast] = useState({ visible: false, message: '', type: 'info' });

  const handleOptForPickup = async (pickupId) => {
    try {
      const itemToSchedule = availablePickups.find(item => item.id === pickupId);
      if (itemToSchedule) {
        await scheduleNewPickup(itemToSchedule);
        setShowToast({ visible: true, message: `Pickup for ${itemToSchedule.wasteType} scheduled!`, type: 'success' });
      }
    } catch (error) {
      console.error("Failed to schedule pickup:", error);
      setShowToast({ visible: true, message: 'Failed to schedule pickup. Please try again.', type: 'error' });
    }
  };
  
  const getWasteIcon = (type) => {
    const icons = { 'Organic': '🌿', 'Plastic': '♻️', 'Metal': '🔧', 'Paper': '📄', 'E-waste': '💻', 'Glass': '🍾' };
    const lowerCaseType = type.toLowerCase();
    if(lowerCaseType.includes('plastic')) return icons['Plastic'];
    if(lowerCaseType.includes('cardboard') || lowerCaseType.includes('paper')) return icons['Paper'];
    if(lowerCaseType.includes('e-waste')) return icons['E-waste'];
    if(lowerCaseType.includes('glass')) return icons['Glass'];
    return '🗑️';
  };

  return (
    <div style={{ padding: '2rem 1rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: '#1a4d1a', fontSize: '2.2rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>
            📅 Available for Pickup
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>
            Browse and select waste items to add to your pickup route.
          </p>
        </div>

        {availablePickups.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {availablePickups.map((item) => (
              <div key={item.id} style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={item.photoUrl} alt={item.wasteType} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ color: '#1a4d1a', margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>{item.wasteType}</h3>
                    <span style={{ fontSize: '1.5rem' }}>{getWasteIcon(item.wasteType)}</span>
                  </div>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}><strong>Uploader:</strong> {item.userName}</p>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 1rem 0' }}><strong>📍 Location:</strong> {item.pickupLocation}</p>
                  <p style={{ color: '#555', fontSize: '0.9rem', margin: '0 0 1.5rem 0', flexGrow: 1 }}>{item.specialInstructions}</p>
                  <button
                    onClick={() => handleOptForPickup(item.id)}
                    style={{
                      backgroundColor: '#2e7d32',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      width: '100%'
                    }}
                  >
                    Opt for Pickup
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
           <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', textAlign: 'center', color: '#666', border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h3 style={{ color: '#1a4d1a', marginBottom: '0.5rem' }}>All Clear!</h3>
            <p>There are no new items available for pickup at the moment.</p>
          </div>
        )}
      </div>
      <NotificationToast
        message={showToast.message}
        type={showToast.type}
        isVisible={showToast.visible}
        onClose={() => setShowToast({ ...showToast, visible: false })}
      />
    </div>
  );
};

export default CollectorSchedulePage;
