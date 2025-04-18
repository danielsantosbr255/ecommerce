// app/components/Skeleton.tsx
type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`bg-gray-200 border border-neutral-200 rounded-sm animate-skeleton ${className}`} />;
}
