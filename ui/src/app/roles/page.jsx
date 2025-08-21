'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RolePage() {
  const router = useRouter();

  useEffect(() => {
    const fetchMe = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/users/me`, {
        method: 'GET',
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        const role = data?.role;

        if (role === 'admin') router.push('/dashboard/admin');
        else if (role === 'seller') router.push('/dashboard/seller');
        else router.push('/dashboard/customer');
      } else {
        router.push('/auth/login');
      }
    };

    fetchMe();
  }, [router]);

  return (
    <p className="text-center mt-20 text-lg">Redirecting based on role...</p>
  );
}