// src/components/LoadingState.tsx
import React from "react";

export default function LoadingState() {
  return (
    <div className="bg-gray-200/20 flex flex-col justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 flex justify-center items-center"></div>
    </div>
  );
}
