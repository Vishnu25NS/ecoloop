import React from 'react';

// This component will wrap our collector routes
const ProtectedCollectorRoute = ({ children, user }) => {
  // In a real app, you would likely use React Router's <Navigate> component
  // for a cleaner redirect without a full page reload.
  if (!user || user.role !== 'collector') {
    // For now, this simple redirect will work for demonstration.
    // It sends unauthorized users to a different page.
    window.location.href = '/unauthorized'; // You can create this page later
    return null; // Render nothing while redirecting
  }

  // If the user is a collector, render the page content
  return children;
};

export default ProtectedCollectorRoute;
