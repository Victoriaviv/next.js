'use client';

import { useState } from "react";
import Register from "@/components/Auth/Register";
import Login from "@/components/Auth/Login";

export default function RegisterPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {showLogin ? (
        <Login
          changeModal={() => {}}
          switchToRegister={() => setShowLogin(false)}
        />
      ) : (
        <Register
          changeModal={() => {}}
          switchToLogin={() => setShowLogin(true)}
        />
      )}

    </div>
  )
}
