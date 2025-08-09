import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import NotificationToast from './NotificationToast';

const PickupManagement = () => {
  const { assignedPickups, updatePickupStatus, db, user } = useAppContext();
  
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [showToast, setShowToast] = useState({ visible: false, message: '', type: 'info' });

  const handleUpdateStatus = async (pickupId, newStatus, notes = '') => {
    try {
      await updatePickupStatus(pickupId, newStatus, notes);
      setShowToast({ visible: true, message: `Pickup ${pickupId} updated to ${newStatus}`, type: 'success' });
      if (selectedPickup && selectedPickup.id === pickupId) {
        setSelectedPickup(prev => ({...prev, status: newStatus, notes: notes || prev.notes}));
      }
    } catch (error) {
      console.error("Failed to update pickup status:", error);
      setShowToast({ visible: true, message: 'Failed to update status. Please try again.', type: 'error' });
    }
  };

  const filteredPickups = filterStatus === 'All'
    ? assignedPickups
    : assignedPickups.filter(pickup => pickup.status === filterStatus);

  const statusCounts = assignedPickups.reduce((acc, pickup) => {
    acc[pickup.status] = (acc[pickup.status] || 0) + 1;
    return acc;
  }, {});

  const getStatusColor = (status) => {
    const colors = { 'Pending': '#ff9800', 'In Progress': '#2196f3', 'Completed': '#4caf50', 'Cancelled': '#f44336' };
    return colors[status] || '#666';
  };

  const getPriorityColor = (priority) => {
    const colors = { 'High': '#f44336', 'Medium': '#ff9800', 'Low': '#4caf50' };
    return colors[priority] || '#666';
  };

  const getWasteIcon = (type) => {
    const icons = { 'Organic': '🌿', 'Plastic': '♻️', 'Metal': '🔧', 'Paper': '📄', 'E-waste': '💻' };
    return icons[type] || '🗑️';
  };

  return (
    <div style={{ padding: '2rem 1rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ color: '#1a4d1a', fontSize: '2.2rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>
              🚛 Pickup Management
            </h1>
            <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>
              Manage and track all assigned pickup tasks
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/collector/map'}
            style={{ backgroundColor: '#2e7d32', color: 'white', border: 'none', padding: '1rem 1.5rem', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s ease', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1a4d1a'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2e7d32'}
          >
            <span>📍</span>
            <span>View Route Map</span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {['All', 'Pending', 'In Progress', 'Completed', 'Cancelled'].map(status => {
            const count = status === 'All' ? assignedPickups.length : (statusCounts[status] || 0);
            const isActive = filterStatus === status;
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{ padding: '0.75rem 1.25rem', borderRadius: '25px', border: isActive ? '2px solid #2e7d32' : '1px solid #e0e0e0', backgroundColor: isActive ? '#e8f5e8' : 'white', color: isActive ? '#1a4d1a' : '#666', fontSize: '0.9rem', fontWeight: isActive ? '600' : '500', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onMouseEnter={(e) => { if (!isActive) e.target.style.backgroundColor = '#f0f0f0'; }}
                onMouseLeave={(e) => { if (!isActive) e.target.style.backgroundColor = 'white'; }}
              >
                {status} {count > 0 && (
                  <span style={{ backgroundColor: isActive ? '#2e7d32' : '#999', color: 'white', borderRadius: '12px', padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {filteredPickups.length === 0 ? (
            <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', textAlign: 'center', color: '#666', border: '1px solid #e0e0e0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
              <h3 style={{ color: '#1a4d1a', marginBottom: '0.5rem' }}>No pickups found</h3>
              <p>No pickups match the selected filter criteria.</p>
            </div>
          ) : (
            filteredPickups.map(pickup => (
              <div
                key={pickup.id}
                style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e0e0e0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', transition: 'all 0.2s ease', cursor: 'pointer' }}
                onClick={() => setSelectedPickup(pickup)}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#e8f5e8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
                        {getWasteIcon(pickup.wasteType)}
                      </div>
                      <div>
                        <h3 style={{ color: '#1a4d1a', margin: '0 0 0.25rem 0', fontSize: '1.2rem', fontWeight: '600' }}>
                          {pickup.userName}
                        </h3>
                        <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                          {pickup.wasteType} • {pickup.estimatedWeight || 'N/A'} • {pickup.userPhone}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#999' }}>
                          ID: {pickup.id}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                      <div style={{ padding: '0.4rem 1rem', borderRadius: '20px', backgroundColor: getStatusColor(pickup.status) + '20', color: getStatusColor(pickup.status), fontSize: '0.85rem', fontWeight: '600' }}>
                        {pickup.status}
                      </div>
                      <div style={{ padding: '0.2rem 0.8rem', borderRadius: '15px', backgroundColor: getPriorityColor(pickup.priority) + '15', color: getPriorityColor(pickup.priority), fontSize: '0.75rem', fontWeight: '600' }}>
                        {pickup.priority} Priority
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                      <span>📅</span>
                      <span>{pickup.pickupDate} at {pickup.pickupTime}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                      <span style={{ marginTop: '0.1rem' }}>📍</span>
                      <span style={{ lineHeight: '1.3' }}>{pickup.pickupLocation}</span>
                    </div>
                  </div>
                  {pickup.specialInstructions && (
                    <div style={{ backgroundColor: '#fff3c4', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', border: '1px solid #ffeb3b' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <span style={{ marginTop: '0.1rem' }}>💡</span>
                        <div>
                          <div style={{ fontWeight: '600', color: '#f57c00', marginBottom: '0.25rem' }}>Special Instructions:</div>
                          <div style={{ color: '#333' }}>{pickup.specialInstructions}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {pickup.status === 'Pending' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleUpdateStatus(pickup.id, 'In Progress'); }}
                        style={{ backgroundColor: '#2196f3', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s ease' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#1976d2'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#2196f3'}
                      >
                        Start Pickup
                      </button>
                    )}
                    {pickup.status === 'In Progress' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleUpdateStatus(pickup.id, 'Completed'); }}
                        style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s ease' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#388e3c'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#4caf50'}
                      >
                        Complete Pickup
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); window.open(`https://maps.google.com/?q=${pickup.coordinates.lat},${pickup.coordinates.lng}`, '_blank'); }}
                      style={{ backgroundColor: 'white', color: '#2e7d32', border: '1px solid #2e7d32', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease' }}
                      onMouseEnter={(e) => { e.target.style.backgroundColor = '#2e7d32'; e.target.style.color = 'white'; }}
                      onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#2e7d32'; }}
                    >
                      📍 Navigate
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); window.open(`tel:${pickup.userPhone}`, '_self'); }}
                      style={{ backgroundColor: 'white', color: '#666', border: '1px solid #e0e0e0', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease' }}
                      onMouseEnter={(e) => { e.target.style.backgroundColor = '#f0f0f0'; }}
                      onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; }}
                    >
                      📞 Call
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedPickup && (
          <div
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}
            onClick={() => setSelectedPickup(null)}
          >
            <div
              style={{ backgroundColor: 'white', borderRadius: '12px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: '#1a4d1a', margin: 0, fontSize: '1.3rem', fontWeight: '600' }}>
                  Pickup Details - {selectedPickup.id}
                </h2>
                <button onClick={() => setSelectedPickup(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#666', padding: '0.25rem' }}>
                  ×
                </button>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#1a4d1a', margin: '0 0 0.75rem 0', fontSize: '1.1rem' }}>Customer Information</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div><strong>Name:</strong> {selectedPickup.userName}</div>
                    <div><strong>Phone:</strong> {selectedPickup.userPhone}</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#1a4d1a', margin: '0 0 0.75rem 0', fontSize: '1.1rem' }}>Pickup Details</h4>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div><strong>Waste Type:</strong> {getWasteIcon(selectedPickup.wasteType)} {selectedPickup.wasteType}</div>
                      <div><strong>Estimated Weight:</strong> {selectedPickup.estimatedWeight || 'N/A'}</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div><strong>Date:</strong> {selectedPickup.pickupDate}</div>
                      <div><strong>Time:</strong> {selectedPickup.pickupTime}</div>
                    </div>
                    <div><strong>Location:</strong> {selectedPickup.pickupLocation}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div><strong>Status:</strong> <span style={{ marginLeft: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '15px', backgroundColor: getStatusColor(selectedPickup.status) + '20', color: getStatusColor(selectedPickup.status), fontSize: '0.85rem', fontWeight: '600' }}>{selectedPickup.status}</span></div>
                      <div><strong>Priority:</strong> <span style={{ marginLeft: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '15px', backgroundColor: getPriorityColor(selectedPickup.priority) + '15', color: getPriorityColor(selectedPickup.priority), fontSize: '0.85rem', fontWeight: '600' }}>{selectedPickup.priority}</span></div>
                    </div>
                  </div>
                </div>

                {selectedPickup.specialInstructions && (
                  <div style={{ backgroundColor: '#fff3c4', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #ffeb3b' }}>
                    <h4 style={{ color: '#f57c00', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>💡 Special Instructions</h4>
                    <p style={{ margin: 0, color: '#333' }}>{selectedPickup.specialInstructions}</p>
                  </div>
                )}

                <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#1a4d1a', margin: '0 0 0.75rem 0', fontSize: '1.1rem' }}>Notes</h4>
                  <textarea
                    defaultValue={selectedPickup.notes || ''}
                    placeholder="Add notes about this pickup..."
                    style={{ width: '100%', minHeight: '80px', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '0.9rem', fontFamily: 'inherit', resize: 'vertical' }}
                    onChange={(e) => setSelectedPickup(p => ({...p, notes: e.target.value}))}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {selectedPickup.status === 'Pending' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedPickup.id, 'In Progress', selectedPickup.notes)}
                      style={{ backgroundColor: '#2196f3', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '1rem', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s ease' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#1976d2'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#2196f3'}
                    >
                      Start Pickup
                    </button>
                  )}
                  {selectedPickup.status === 'In Progress' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedPickup.id, 'Completed', selectedPickup.notes)}
                      style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '1rem', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s ease' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#388e3c'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#4caf50'}
                    >
                      Complete Pickup
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedPickup(null)}
                    style={{ backgroundColor: 'white', color: '#666', border: '1px solid #e0e0e0', padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '1rem', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease' }}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#f0f0f0'; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <NotificationToast
          message={showToast.message}
          type={showToast.type}
          isVisible={showToast.visible}
          onClose={() => setShowToast({ ...showToast, visible: false })}
        />
      </div>
    </div>
  );
};

export default PickupManagement;
