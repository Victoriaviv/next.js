'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // ✅ Clear localStorage items
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');

    // ✅ Optionally, show a small delay before redirect
    setTimeout(() => {
      router.push('/');
    }, 500); // adjust delay if needed
  }, [router]);

  return <p>You have been logged out successfully...</p>;
}
