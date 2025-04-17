import React from "react";
import { LoaderCircle } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="bg-gray-200/20 flex flex-col justify-center items-center h-screen">
      <div className="animate-spin flex justify-center items-center">
        <LoaderCircle size={150} className="text-highlight-n" />
      </div>
    </div>
  );
}
