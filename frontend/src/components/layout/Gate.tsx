// components/Gate.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function Gate({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-gray-200/20 flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 flex justify-center items-center"></div>
      </div>
    );
  }
  return children;
}
