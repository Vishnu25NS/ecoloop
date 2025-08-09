import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const CollectorMapPage = () => {
  const { assignedPickups } = useAppContext();
  const [selectedPickup, setSelectedPickup] = useState(null);

  const pendingPickups = assignedPickups.filter(p => p.status === 'Pending' || p.status === 'In Progress');

  const getWasteIcon = (type) => {
    const icons = { 'Organic': '🌿', 'Plastic': '♻️', 'Metal': '🔧', 'Paper': '📄', 'E-waste': '💻', 'Glass': '🍾' };
    const lowerCaseType = type.toLowerCase();
    if(lowerCaseType.includes('plastic')) return icons['Plastic'];
    if(lowerCaseType.includes('cardboard') || lowerCaseType.includes('paper')) return icons['Paper'];
    if(lowerCaseType.includes('e-waste')) return icons['E-waste'];
    if(lowerCaseType.includes('glass')) return icons['Glass'];
    return '🗑️';
  };
  
  const normalizeCoordinates = (pickups) => {
    if (pickups.length === 0) return [];
    const lats = pickups.map(p => p.coordinates.lat);
    const lngs = pickups.map(p => p.coordinates.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latRange = maxLat - minLat || 1;
    const lngRange = maxLng - minLng || 1;

    return pickups.map(p => ({
      ...p,
      mapX: ((p.coordinates.lng - minLng) / lngRange) * 90 + 5,
      mapY: ((maxLat - p.coordinates.lat) / latRange) * 90 + 5,
    }));
  };
  
  const pickupsWithMapCoords = normalizeCoordinates(pendingPickups);

  return (
    <div style={{ padding: '2rem 1rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: '#1a4d1a', fontSize: '2.2rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>
            🗺️ Today's Route Map
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>
            Visual overview of pending and in-progress pickups.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexDirection: 'row', flexWrap: 'wrap' }}>
          <div style={{ flex: 3, minWidth: '400px', height: '600px', backgroundColor: '#e0e0e0', borderRadius: '12px', position: 'relative', overflow: 'hidden', border: '2px solid #ccc', background: 'linear-gradient(to bottom, #a2d5c6, #dcedc1)' }}>
            <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(255,255,255,0.8)', padding: '5px 10px', borderRadius: '6px', fontSize: '0.8rem' }}>Simulated Map View</div>
            {pickupsWithMapCoords.map((pickup, index) => (
              <div
                key={pickup.id}
                style={{
                  position: 'absolute',
                  left: `${pickup.mapX}%`,
                  top: `${pickup.mapY}%`,
                  transform: 'translate(-50%, -50%)',
                  transition: 'all 0.3s ease',
                  zIndex: selectedPickup?.id === pickup.id ? 10 : 1,
                }}
                onMouseEnter={() => setSelectedPickup(pickup)}
                onMouseLeave={() => setSelectedPickup(null)}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50% 50% 50% 0',
                  backgroundColor: pickup.status === 'In Progress' ? '#2196f3' : '#f44336',
                  transform: 'rotate(-45deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  border: '2px solid white',
                }}>
                  <span style={{ transform: 'rotate(45deg)', fontSize: '1rem' }}>{getWasteIcon(pickup.wasteType)}</span>
                </div>
                 {selectedPickup?.id === pickup.id && (
                  <div style={{ position: 'absolute', bottom: '120%', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: '6px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', whiteSpace: 'nowrap', fontSize: '0.9rem', fontWeight: '600', color: '#1a4d1a' }}>
                    {pickup.userName} - {pickup.wasteType}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ flex: 2, minWidth: '300px', maxHeight: '600px', overflowY: 'auto', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
             <h3 style={{ color: '#1a4d1a', padding: '1rem 1.5rem', margin: 0, borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                Pickup Queue ({pendingPickups.length})
              </h3>
            {pendingPickups.map(pickup => (
              <div
                key={pickup.id}
                style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: '1rem', alignItems: 'center', transition: 'background-color 0.2s ease', cursor: 'pointer' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8f9fa'; setSelectedPickup(pickup); }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; setSelectedPickup(null); }}
              >
                <div style={{ fontSize: '1.5rem' }}>{getWasteIcon(pickup.wasteType)}</div>
                <div>
                  <div style={{ fontWeight: '600', color: '#1a4d1a' }}>{pickup.userName}</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>{pickup.pickupLocation}</div>
                  <div style={{ fontSize: '0.8rem', color: pickup.status === 'In Progress' ? '#2196f3' : '#ff9800', fontWeight: '500' }}>{pickup.status}</div>
                </div>
              </div>
            ))}
             {pendingPickups.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No active pickups.</div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectorMapPage;