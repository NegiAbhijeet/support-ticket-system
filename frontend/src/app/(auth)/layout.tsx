'use client';

import PublicRoute from '@/components/PublicRoute';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PublicRoute>{children}</PublicRoute>;
}