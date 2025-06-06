import React from "react";
import Skeleton from "../ui/Skeleton";

export default function PromotionSkeleton() {
  return (
    <div className="bg-bg-primary border border-lines/50 relative w-full rounded-xl p-4 grid grid-cols-[30%_auto]">
      <div className="flex items-center aspect-square m-auto justify-center !max-h-80 !max-w-80 w-full h-full">
        <Skeleton className="rounded-xl p-5 w-full h-full" />
      </div>

      <div className="max-w-10/12 w-full h-full mx-auto flex flex-col justify-center">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-8 w-1/2 mb-2" />
        {/* <Skeleton className="h-8 w-1/3" /> */}
      </div>
    </div>
  );
}
