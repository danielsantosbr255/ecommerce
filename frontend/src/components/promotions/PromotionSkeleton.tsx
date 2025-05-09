import React from "react";
import Skeleton from "../ui/Skeleton";

export default function PromotionSkeleton() {
  return (
    <div className="bg-bg-secondary border border-lines relative w-full rounded-2xl shadow-xs p-4 grid grid-cols-[30%_auto]">
      <div className="flex items-center aspect-square m-auto justify-center !max-h-80 !max-w-80 w-full h-full">
        <Skeleton className="rounded-xl p-5 w-full h-full" />
      </div>

      <div className="max-w-10/12 w-full h-full mx-auto flex flex-col justify-center">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-8 w-1/2 mb-2" />
        <Skeleton className="h-8 w-1/3" />
      </div>

      <div className="absolute top-5 right-5 h-25 w-25 items-center justify-center flex text-4xl font-bold text-tx-on-primary">
        <p className="absolute font-bold w-full h-full items-center justify-center flex text-4xl border-5 rounded-full shadow-xs"></p>
        <p className="absolute animate-material-spin font-bold w-full h-full items-center justify-center flex text-4xl border border-t-transparent border-b-transparent scale-105 rounded-full shadow-xs"></p>
        <p className="absolute text-center">
          %
          <span className="absolute text-sm translate-x-1/2 right-1/2 flex items-center justify-center">
            OFF
          </span>
        </p>
      </div>
    </div>
  );
}
