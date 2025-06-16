'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNav from "Components/DashboardNav";
import DashboardSidebar from "Components/DashboardSidebar";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      setIsAuth(true);
    } else {
      router.push("/login"); // Redirect if not authenticated
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Checking authentication...</div>;
  if (!isAuth) return null;

  return (
    <div className="dashboard-container">
      <DashboardNav />
      <DashboardSidebar />
    </div>
  )
}
