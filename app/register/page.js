'use client';

import { useState } from "react";
import Register from "Components/Register";
import Login from "Components/Login";

const RegisterPage = () => {
  const [showLogin, setShowLogin] = useState(false); 

  return (
    <div>
      {showLogin ? (
        <Login changeModal={() => {}} switchToRegister={() => setShowLogin(false)} />
      ) : (
        <Register changeModal={() => {}} switchToLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
};

export default RegisterPage;
