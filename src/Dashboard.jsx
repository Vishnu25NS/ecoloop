import React from "react";
import { useAppContext } from "./context/AppContext";

// Placeholder dashboard, shows user info and tags
const Dashboard = () => {
  const { user, logout } = useAppContext();

  if (!user) return null;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f6f6f6"
    }}>
      <div style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        minWidth: "340px"
      }}>
        <h2 style={{ marginBottom: "1rem" }}>Welcome, {user.name || user.phone}!</h2>
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Phone:</strong> {user.phone}
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Location:</strong> {user.location}
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Tags:</strong> {user.tags && user.tags.join(", ")}
        </div>
        {user.tags && user.tags.includes("Collector") && (
          <div style={{ marginBottom: "0.5rem" }}>
            <strong>Waste Types:</strong> {user.collectorDetails?.wasteTypes?.join(", ")}
            <br />
            <strong>Other Info:</strong> {user.collectorDetails?.extraInfo}
          </div>
        )}
        <button
          onClick={logout}
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            borderRadius: "6px",
            border: "none",
            background: "#d32f2f",
            color: "#fff",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;