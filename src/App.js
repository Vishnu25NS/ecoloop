import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';

// Import User components
import Navigation from './components/Navigation';
import SchedulePage from './pages/SchedulePage';
import CreditsPage from './pages/CreditsPage';
import StatusPage from './pages/StatusPage';
import ClassifyPage from './pages/ClassifyPage';
import HistoryPage from './pages/HistoryPage';

// Import Collector components
import CollectorNavigation from './collector/CollectorNavigation';
import CollectorDashboard from './collector/CollectorDashboard';
import PickupManagement from './collector/PickupManagement';
import CollectorSchedulePage from './collector/CollectorSchedulePage';
import CollectorMapPage from './collector/CollectorMapPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import SuperNavBar from './components/SuperNavBar';

const AppContent = () => {
  const { isAuthenticated, mode, user, isAuthReady, logout } = useAppContext();

  if (!isAuthReady) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h1 style={{ color: '#2e7d32', fontSize: '2.5rem', fontWeight: '700' }}>🌱 EcoLoop</h1>
        <div style={{ fontSize: '1.5rem', color: '#666' }}>Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
        <header style={{ backgroundColor: '#2e7d32', color: 'white', padding: '1.5rem 0', textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '700' }}>🌱 EcoLoop</h1>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '1.1rem' }}>Smart Waste Management Platform</p>
        </header>

        {/* Render the SuperNavBar for users with multiple roles */}
        {isAuthenticated && user?.roles?.length > 1 && <SuperNavBar />}
        
        {isAuthenticated && user?.roles?.includes('collector') && mode === 'collector' ? (
          <CollectorNavigation user={user} logout={logout} />
        ) : isAuthenticated && user?.roles?.includes('user') && mode === 'user' ? (
          <Navigation user={user} logout={logout} />
        ) : null}

        <main style={{ minHeight: 'calc(100vh - 200px)' }}>
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : mode === 'collector' && user?.roles?.includes('collector') ? (
              <>
                <Route path="/collector/dashboard" element={<CollectorDashboard user={user} />} />
                <Route path="/collector/pickups" element={<PickupManagement />} />
                <Route path="/collector/map" element={<CollectorMapPage />} />
                <Route path="/collector/schedule" element={<CollectorSchedulePage />} />
                <Route path="*" element={<Navigate to="/collector/dashboard" />} />
              </>
            ) : mode === 'user' && user?.roles?.includes('user') ? (
              <>
                <Route path="/classify" element={<ClassifyPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/credits" element={<CreditsPage />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="*" element={<Navigate to="/classify" />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </main>
        
        <footer style={{ backgroundColor: '#e8f5e8', padding: '2rem 1rem', textAlign: 'center', color: '#2e7d32', marginTop: '3rem' }}>
          <p style={{ margin: 0, fontSize: '1rem', fontWeight: '500' }}>🌍 Together, we're building a cleaner, greener future</p>
        </footer>
      </div>
    </Router>
  );
};

const App = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
