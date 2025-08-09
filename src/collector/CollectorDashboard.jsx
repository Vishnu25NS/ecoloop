import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const CollectorDashboard = ({ user }) => {
  const { assignedPickups } = useAppContext();
  const navigate = useNavigate();

  const todayPickups = assignedPickups.filter(p => new Date(p.pickupDate).toDateString() === new Date().toDateString());
  const completedToday = todayPickups.filter(p => p.status === 'Completed').length;
  const pendingToday = todayPickups.filter(p => p.status === 'Pending' || p.status === 'In Progress').length;
  const totalCompleted = assignedPickups.filter(p => p.status === 'Completed').length;
  
  const getStatusColor = (status) => ({ 'Completed': '#4caf50', 'In Progress': '#2196f3', 'Pending': '#ff9800', 'Cancelled': '#f44336' }[status] || '#666');
  const getWasteIcon = (type) => ({ 'Organic': '🌿', 'Plastic': '♻️', 'Metal': '🔧', 'Paper': '📄', 'E-waste': '💻' }[type] || '🗑️');

  return (
    <div style={{ padding: '2rem 1rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: '#1a4d1a', fontSize: '2.2rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>
            Welcome back, {user?.name || 'Collector'}! 👋
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>
            Here's your pickup overview for today
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#1a4d1a', margin: 0, fontSize: '1.1rem' }}>Today's Pickups</h3>
              <span style={{ fontSize: '2rem' }}>📋</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2e7d32', marginBottom: '0.5rem' }}>
              {todayPickups.length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              {completedToday} completed, {pendingToday} pending
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#1a4d1a', margin: 0, fontSize: '1.1rem' }}>Total Pickups</h3>
              <span style={{ fontSize: '2rem' }}>🚛</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2e7d32', marginBottom: '0.5rem' }}>
              {totalCompleted}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              Completed over all time
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#1a4d1a', margin: 0, fontSize: '1.1rem' }}>Today's Weight</h3>
              <span style={{ fontSize: '2rem' }}>⚖️</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2e7d32', marginBottom: '0.5rem' }}>
              {todayPickups.reduce((acc, p) => acc + (parseFloat(p.estimatedWeight) || 0), 0)}
              <span style={{ fontSize: '1rem', fontWeight: '400', marginLeft: '0.25rem' }}>kg</span>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              Sum of estimated weights
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#1a4d1a', margin: 0, fontSize: '1.1rem' }}>Weekly Progress</h3>
              <span style={{ fontSize: '2rem' }}>🎯</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2e7d32', marginBottom: '0.5rem' }}>
              {(Math.min(totalCompleted / 50, 1) * 100).toFixed(0)}%
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginBottom: '0.5rem', overflow: 'hidden' }}>
              <div style={{ width: `${(Math.min(totalCompleted / 50, 1) * 100).toFixed(0)}%`, height: '100%', backgroundColor: '#4caf50', borderRadius: '4px', transition: 'width 0.5s ease' }} />
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              {totalCompleted}/{50} pickups this week
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e0e0e0', backgroundColor: '#f8f9fa' }}>
            <h3 style={{ color: '#1a4d1a', margin: 0, fontSize: '1.3rem', fontWeight: '600' }}>
              Recent Pickup Activities
            </h3>
          </div>
          <div>
            {assignedPickups.length > 0 ? (
              assignedPickups.slice(0, 3).map((pickup, index) => (
                <div key={pickup.id} style={{ padding: '1.5rem', borderBottom: index < assignedPickups.slice(0, 3).length - 1 ? '1px solid #f0f0f0' : 'none', transition: 'background-color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e8f5e8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                        {getWasteIcon(pickup.wasteType)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', color: '#1a4d1a', fontSize: '1rem', marginBottom: '0.25rem' }}>
                          {pickup.userName}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                          {pickup.wasteType} • {pickup.pickupTime} • {pickup.pickupLocation}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#999' }}>
                          ID: {pickup.id}
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: '0.5rem 1rem', borderRadius: '20px', backgroundColor: getStatusColor(pickup.status) + '20', color: getStatusColor(pickup.status), fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
                      {pickup.status}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No recent activities</div>
            )}
          </div>
          <div style={{ padding: '1rem 1.5rem', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
            <button onClick={() => navigate('/collector/pickups')} style={{ backgroundColor: '#2e7d32', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s ease' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#1a4d1a'} onMouseLeave={(e) => e.target.style.backgroundColor = '#2e7d32'}>
              View All Pickups →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectorDashboard;