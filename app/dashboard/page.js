"use client";

import { useEffect, useState } from "react";
import Login from "Components/Login";
import Register from "Components/Register";
import DashboardNav from "Components/DashboardNav";
import DashboardSidebar from "Components/DashboardSidebar";

export default function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setLoggedIn(true);
    }
    setChecking(false);
  }, []);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const switchToRegister = () => setShowRegister(true);
  const switchToLogin = () => setShowRegister(false);

  if (checking) {
    return <div>Loading...</div>;
  }

  if (!loggedIn) {
    return showRegister ? (
      <Register changeModal={switchToLogin} />
    ) : (
      <Login changeModal={handleLoginSuccess} goToRegister={switchToRegister} />
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardNav />
      <DashboardSidebar />
    </div>
  );
}
