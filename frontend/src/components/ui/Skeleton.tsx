// app/components/Skeleton.tsx
type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`bg-gray-200 border-lines rounded-sm animate-skeleton ${className}`} />;
}
