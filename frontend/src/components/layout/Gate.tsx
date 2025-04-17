// components/Gate.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import LoadingState from "../LoadingState";

export default function Gate({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingState />;
  }
  return children;
}
