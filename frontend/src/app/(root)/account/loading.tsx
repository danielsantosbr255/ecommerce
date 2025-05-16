import LoadingState from "@/components/ui/LoadingState";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <LoadingState />
    </div>
  );
}
