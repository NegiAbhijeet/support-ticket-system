'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  // ⏳ While checking
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="h-10 w-10 border-b-2 border-black animate-spin rounded-full" />
      </div>
    );
  }

  // ❌ Not logged in
  if (!user) return null;

  // ✅ Logged in
  return <>{children}</>;
}