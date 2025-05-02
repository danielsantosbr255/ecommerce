import Skeleton from "@/components/ui/Skeleton";

interface ProductCardSkeletonProps {
  className?: string;
}

export default function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <article
      className={`bg-none flex flex-col gap-2 p-2 rounded-lg border border-lines scale-97 h-full ${className}`}
    >
      <main className="flex flex-col justify-between h-full">
        <Skeleton className="w-1/7 h-6 mb-2" />
        <div className="flex-1">
          <Skeleton className="w-full aspect-[4/3]" />
          <Skeleton className="w-3/4 h-5 mt-2" />
          <Skeleton className="w-3/4 h-10 mt-5" />
          <Skeleton className="w-1/4 h-4 mt-1" />
          <Skeleton className="w-2/3 h-4 mt-1" />
        </div>
        <Skeleton className="w-full h-10 mt-10 border" />
      </main>
    </article>
  );
}
