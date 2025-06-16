
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/login"); 
    } else {
      setIsLoading(false); 
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return <>{children}</>;
};

export default AuthGuard;
