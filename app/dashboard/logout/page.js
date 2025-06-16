'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
   
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');

  
    setTimeout(() => {
      router.push('/');
    }, 500); 
  }, [router]);

  return <p>You have been logged out successfully...</p>;
}
