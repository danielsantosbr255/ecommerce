import LoadingState from "@/components/LoadingState";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col h-[100vh] justify-center items-center">
      <LoadingState />
    </div>
  );
}
