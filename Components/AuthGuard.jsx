// Components/AuthGuard.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/login"); // redirect to login if no token found
    } else {
      setIsLoading(false); // token found, stop loading
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; // or a spinner component
  }

  return <>{children}</>;
};

export default AuthGuard;
