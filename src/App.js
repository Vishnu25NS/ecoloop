import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import UploadPage from './pages/UploadPage';
import SchedulePage from './pages/SchedulePage';
import ClassificationPage from './pages/ClassificationPage';
import CreditsPage from './pages/CreditsPage';
import StatusPage from './pages/StatusPage';
import AppContext from './context/AppContext';

const App = () => {
  const [credits, setCredits] = useState(125);
  const [classification, setClassification] = useState(null);
  const [pickups, setPickups] = useState([]);

  const showToast = (msg) => alert(msg);

  const addCredits = (amount) => setCredits((c) => c + amount);
  const addPickup = (pickup) => setPickups((p) => [...p, pickup]);

  const contextValue = {
    credits,
    classification,
    pickups,
    setClassification,
    addCredits,
    addPickup,
    showToast,
  };

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.history.replaceState({}, '', '/upload');
    }
  }, []);

  return (
    <AppContext.Provider value={contextValue}>
      <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        {/* Header */}
        <header style={{ backgroundColor: '#2e7d32', color: 'white', padding: '1.5rem 0', textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '700', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>🌱 EcoLoop</h1>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '1.1rem', fontWeight: '300' }}>Smart Waste Management Platform</p>
        </header>

        <Router>
          <Navigation />
          <main style={{ minHeight: 'calc(100vh - 200px)' }}>
            <Routes>
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/classification" element={<ClassificationPage />} />
              <Route path="/credits" element={<CreditsPage />} />
              <Route path="/status" element={<StatusPage />} />
              <Route path="*" element={<UploadPage />} />
            </Routes>
          </main>
        </Router>

        {/* Footer */}
        <footer style={{ backgroundColor: '#e8f5e8', padding: '2rem 1rem', textAlign: 'center', color: '#2e7d32', marginTop: '3rem' }}>
          <p style={{ margin: 0, fontSize: '1rem', fontWeight: '500' }}>🌍 Together, we're building a cleaner, greener future</p>
          <div style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.8, display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <span>📧 support@ecoloop.com</span>
            <span>📞 1-800-ECO-LOOP</span>
            <span>🌐 www.ecoloop.com</span>
          </div>
        </footer>
      </div>
    </AppContext.Provider>
  );
};

export default App;
